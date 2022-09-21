package com.team_60.Mocco.security.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import com.team_60.Mocco.security.dto.Request;
import com.team_60.Mocco.security.dto.Response;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static com.team_60.Mocco.exception.businessLogic.ExceptionCode.*;
import static com.team_60.Mocco.security.filter.JwtConstants.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SecurityService {
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RedisTemplate redisTemplate;

    public ResponseEntity login(Request.Login login, HttpServletResponse response) throws IOException {

        Member member = memberRepository.findByEmail(login.getEmail()).orElse(null);
        if(member == null){
            log.info("해당하는 유저가 존재하지 않습니다.");
            throw new BusinessLogicException(USERNAME_NOT_FOUND);
        }
        UsernamePasswordAuthenticationToken authenticationToken = login.toAuthentication();
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        Map<String, Object> tokenInfo = jwtTokenProvider.generateToken(authentication,response);
        redisTemplate.opsForValue()
                .set("RefreshToken:"+authentication.getName(),tokenInfo.get(REFRESH_TOKEN_HEADER), REFRESH_TOKEN_EXP, TimeUnit.MILLISECONDS);

        Response.Member responseDto = Response.Member.builder()
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .roles(member.getRoles())
                .build();

        return new ResponseEntity(responseDto, HttpStatus.OK);
    }
    public ResponseEntity logout(HttpServletRequest request){
        if(request.getHeader(ACCESS_TOKEN_HEADER).isEmpty()){
            throw new BusinessLogicException(BAD_REQUEST);
        }
        String accessToken = request.getHeader(ACCESS_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
        //1. AccessToken 검증
        if(!jwtTokenProvider.validateToken(accessToken)){
            log.info("잘못된 요청입니다.");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        //2. AccessToken에서 User email을 가져온다.
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        //3. Redis에서 해당 User email로 저장된 RefreshToken이 있는지 여부를 확인 후 있을 경우 삭제
        if(redisTemplate.opsForValue().get("RefreshToken:"+authentication.getName()) != null){
            //refreshToken 삭제
            redisTemplate.delete("RefreshToken:"+authentication.getName());
        }
        //4. 해당 accessToken 유효시간 가지고 와서 BlackList로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue()
                .set(accessToken,"logout",expiration,TimeUnit.MILLISECONDS);
        log.info("로그아웃 완료");
        return new ResponseEntity(HttpStatus.OK);
    }
    public ResponseEntity refresh(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String reqRefreshToken = request.getHeader(REFRESH_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
        String reqAccessToken = request.getHeader(ACCESS_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
        //1. RefresgToken 검증
        if (!jwtTokenProvider.validateToken(reqRefreshToken)){
            log.info("RefreshToken 정보가 유효하지 않습니다.");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        //2. AccessToken 에서 member email을 가져옴
        Authentication authentication = jwtTokenProvider.getAuthentication(reqAccessToken);

        //3. Redis에서 member email을 기반으로 저장된 RefreshToken 값을 가져옴
        String refreshToken = (String) redisTemplate.opsForValue().get("RefreshToken:"+authentication.getName());

        // (추가) 로그아웃되어 Redis 에 RefreshToken 이 존재하지 않는 경우 처리
        if(ObjectUtils.isEmpty(refreshToken)) {
            log.info("잘못된 요청입니다.");
            throw new BusinessLogicException(BAD_REQUEST);
        }
        if(!refreshToken.equals(request.getHeader(REFRESH_TOKEN_HEADER))) {
            log.info("Refresh Token 정보가 일치하지 않습니다.");
            throw new BusinessLogicException(BAD_REFRESH_TOKEN);
        }

        //4. 새로운 토큰 생성
        Map<String,Object> tokenInfo = jwtTokenProvider.generateToken(authentication,response);
        //5. RefreshToken Redis 업데이트
        redisTemplate.opsForValue()
                .set("RefreshToken:"+authentication.getName(), tokenInfo.get(REFRESH_TOKEN_HEADER), REFRESH_TOKEN_EXP, TimeUnit.MILLISECONDS);

        log.info("Token 정보가 갱신되었습니다.");
        return new ResponseEntity<>(HttpStatus.OK);
    }

//권한 추가해주는 기능
//    public ResponseEntity authority(HttpServletRequest request){
//
//        String accessToken = request.getHeader(ACCESS_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
//        String email = JWT.require(Algorithm.HMAC512(JWT_SECRET)).build().verify(accessToken).getClaim("email").asString();
//
//        Member member = memberRepository.findByEmail(email)
//                .orElseThrow(()->new UsernameNotFoundException("No authentication information"));
//
//        //add ROLE_ADMIN
//        member.setRoles(member.getRoles().concat(",ROLE_ADMIN"));
//        memberRepository.save(member);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//    public String getMemberRoles(HttpServletRequest request){
//        String accessToken = request.getHeader(ACCESS_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
//        String roles = jwtTokenProvider.getAuthentication(accessToken).getAuthorities().toString();
//
//        return roles;
//    }

}
