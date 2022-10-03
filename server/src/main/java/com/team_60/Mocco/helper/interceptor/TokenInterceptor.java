package com.team_60.Mocco.helper.interceptor;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.helper.auth.AuthenticationService;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.stream.Collectors;

import static com.team_60.Mocco.exception.businessLogic.ExceptionCode.BAD_TOKEN_REQUEST;
import static com.team_60.Mocco.security.filter.JwtConstants.ACCESS_TOKEN_HEADER;
import static com.team_60.Mocco.security.filter.JwtConstants.TOKEN_HEADER_PREFIX;


@Slf4j
public class TokenInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) { //handler는 진입하려는 컨트롤러의 클래스 객체
        log.info("인터셉터 시작");
        if (request.getHeader(ACCESS_TOKEN_HEADER) == null || request.getHeader(ACCESS_TOKEN_HEADER).length() < 8) {
            throw new BusinessLogicException(BAD_TOKEN_REQUEST);
        }
        String accessToken = request.getHeader(ACCESS_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
        long tokenMemberId = jwtTokenProvider.getMemberId(accessToken);
        try {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
        if (handlerMethod.getBean().getClass().getSimpleName().equals("StudyProgressController")) {
            long studyId = Long.parseLong(Arrays.stream(request.getRequestURI().split("/")).collect(Collectors.toList()).get(4));
            if (Arrays.stream(request.getRequestURI().split("/")).collect(Collectors.toList()).size() < 6) {
                authenticationService.AuthenticationCheckStudyMember(studyId, tokenMemberId);
            } else {
                long memberId = Long.parseLong(Arrays.stream(request.getRequestURI().split("/")).collect(Collectors.toList()).get(6));
                authenticationService.AuthenticationCheckStudyMember(studyId, memberId);
            }
            return true;
        }

        Arrays.stream(handlerMethod.getMethodParameters()).forEach(n -> {
            if (handlerMethod.hasMethodAnnotation(IdRequired.class)) {
                request.setAttribute("memberId", tokenMemberId);
            }
            if (n.hasParameterAnnotation(PathVariable.class) && (!handlerMethod.getMethod().getName().equals("getMember"))) {
                long id = Long.parseLong(Arrays.stream(request.getRequestURI().split("/")).collect(Collectors.toList()).get(3));
                authenticationService.AuthenticationCheckWithId(n.getParameter().getName(), id, tokenMemberId);
            }
        });
            return true;
        }  catch (ClassCastException e) {
            throw new BusinessLogicException(BAD_TOKEN_REQUEST);
        }
    }
}
