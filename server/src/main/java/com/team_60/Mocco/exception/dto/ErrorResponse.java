package com.team_60.Mocco.exception.dto;

import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ErrorResponse {
    private String message;
    private int status;
    private List<FieldError> errors;

    @Getter
    @NoArgsConstructor
    static class FieldError {
        private String field;
        private String value;
        private String reason;
    }

    private ErrorResponse(String message, int status, List<FieldError> errors){
        this.message = message;
        this.status = status;
        this.errors = errors;
    }

    public static ErrorResponse of(ExceptionCode code){
        return new ErrorResponse(code.getMessage(), code.getStatus(), new ArrayList<>());
    }
}
