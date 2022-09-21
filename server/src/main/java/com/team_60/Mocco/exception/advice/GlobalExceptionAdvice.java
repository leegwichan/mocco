package com.team_60.Mocco.exception.advice;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.dto.ErrorResponse;
import com.team_60.Mocco.exception.oauth.OAuthLogicException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartException;

import java.util.ArrayList;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e){
        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());
        return new ResponseEntity(response,
                HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMultipartException(MultipartException e){
        final ErrorResponse response = new ErrorResponse("파일 업로드 형식이 잘못되었습니다.",
                400, new ArrayList<>());
        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.OK)
    public SingleResponseDto handleOAuthLogicException(OAuthLogicException e){
        
        return new SingleResponseDto(
                new OAuthDto(e.getOauthId()));
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class OAuthDto{
        private long oauthId;
    }
}
