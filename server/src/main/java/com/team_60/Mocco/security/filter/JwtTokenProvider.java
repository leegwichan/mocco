package com.team_60.Mocco.security.filter;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.Claim;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import com.team_60.Mocco.security.oauth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import com.auth0.jwt.JWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

import static com.team_60.Mocco.security.filter.JwtConstants.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {
    private final MemberRepository memberRepository;

    //유저 정보를 가지고 AccessToken, RefreshToken을 생성하는 메서드
    public Map<String, Object> generateToken(Authentication authentication, HttpServletResponse response) throws IOException {
        //권한 가져오기
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = System.currentTimeMillis();

        String accessToken = JWT.create()
                .withSubject("access token")
                .withExpiresAt(new Date(now + ACCESS_TOKEN_EXP))
                .withClaim("memberId", principalDetails.getMemberId())
                .withClaim("auth", authorities)
                .sign(Algorithm.HMAC512(JWT_SECRET));

        String refreshToken = JWT.create()
                .withSubject("refresh token")
                .withExpiresAt(new Date(now + REFRESH_TOKEN_EXP))
                .sign(Algorithm.HMAC512(JWT_SECRET));

        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("utf-8");
        response.setHeader(ACCESS_TOKEN_HEADER, TOKEN_HEADER_PREFIX + accessToken);
        response.setHeader(REFRESH_TOKEN_HEADER, TOKEN_HEADER_PREFIX + refreshToken);

        Map<String, Object> tokenInfo = new HashMap<>();
        tokenInfo.put(REFRESH_TOKEN_HEADER, TOKEN_HEADER_PREFIX + refreshToken);
        tokenInfo.put("refreshTokenExpirationTime",REFRESH_TOKEN_EXP);

        return tokenInfo;
    }

    //JWT 토큰으르 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
            Claim claim = getClaim(accessToken);
            long memberId = JWT.decode(accessToken).getClaim("memberId").asLong();

            if (claim == null) throw new BusinessLogicException(ExceptionCode.CLAIM_NOT_EXIST);
            Member member = memberRepository.findById(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            PrincipalDetails principal = new PrincipalDetails(member);

            //클레임에서 권한 정보 가져오기
            Collection<? extends GrantedAuthority> authorities = Arrays.stream(claim.toString().split(","))
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
            return new UsernamePasswordAuthenticationToken(principal, "", authorities);
        }


    //토큰 정보를 검증하는 메서드
    public boolean validateToken(String token) {
        try {
            JWT.require(Algorithm.HMAC512(JWT_SECRET)).build().verify(token);
        } catch (JWTVerificationException e) {
            if(e.getClass().getSimpleName().equals("TokenExpiredException")){
                log.info(e.getClass().getSimpleName());
                throw new BusinessLogicException(ExceptionCode.TOKEN_EXPIRED_EXCEPTION);
            }
            throw new BusinessLogicException(ExceptionCode.FAIL_DECODE_TOKEN);
        } catch (Exception e) {
            log.info("CustomAuthorizationFilter : JWT 토큰이 잘못되었습니다. message : {}", e.getMessage());
        }
        return true;
    }

    //토큰 남은 유효 시간
    public Long getExpiration(String accessToken){
        Date expiration = JWT.require(Algorithm.HMAC512(JWT_SECRET)).build().verify(accessToken).getExpiresAt();
        Long now = new Date(System.currentTimeMillis()).getTime();
        log.info(String.valueOf(expiration.getTime() - now));
        return (expiration.getTime() - now);
    }

    public long getMemberId(String accessToken){
        try{
            return JWT.require(Algorithm.HMAC512(JWT_SECRET)).build().verify(accessToken).getClaim("memberId").asLong();
        } catch (TokenExpiredException e){
            throw new BusinessLogicException(ExceptionCode.TOKEN_EXPIRED_EXCEPTION);
        } catch (JWTDecodeException e){
            throw new BusinessLogicException(ExceptionCode.FAIL_DECODE_TOKEN);
        }
    }

    private Claim getClaim(String accessToken){
        return JWT.decode(accessToken).getClaim("auth");
    }



}
