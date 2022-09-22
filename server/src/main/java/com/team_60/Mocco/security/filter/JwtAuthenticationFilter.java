package com.team_60.Mocco.security.filter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final RedisTemplate redisTemplate;
    private final JwtTokenProvider jwtTokenProvider;
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        log.info("권한 인증 필터 시작");
        //header에서 JWT 토큰 추출
        String token = getToken((HttpServletRequest) request);

        //토큰 유효성 검사
        if(token != null && jwtTokenProvider.validateToken(token)){
            //redis에 해당 accessToken logout 여부 확인
            String isLogout = (String) redisTemplate.opsForValue().get(token);
            if(ObjectUtils.isEmpty(isLogout)){
                //토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext에 자징
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        chain.doFilter(request, response);
    }
    private String getToken(HttpServletRequest request){
        String authorizationHeader = request.getHeader(JwtConstants.ACCESS_TOKEN_HEADER);

        if(authorizationHeader != null && authorizationHeader.startsWith(JwtConstants.TOKEN_HEADER_PREFIX)){
            return authorizationHeader.substring(JwtConstants.TOKEN_HEADER_PREFIX.length());
        }
        return null;
    }
}
