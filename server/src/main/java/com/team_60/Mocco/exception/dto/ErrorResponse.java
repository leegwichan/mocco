package com.team_60.Mocco.exception.dto;

import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class ErrorResponse {
    private String message;
    private int status;
    private List<FieldError> errors;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    static class FieldError {
        private String field;
        private Object value;
        private String reason;
    }

    public ErrorResponse(String message, int status, List<FieldError> errors){
        this.message = message;
        this.status = status;
        this.errors = errors;
    }

    public static ErrorResponse of(ExceptionCode code){
        return new ErrorResponse(code.getMessage(), code.getStatus(), new ArrayList<>());
    }

    public static ErrorResponse of(BindingResult bindingResult){
        final List<org.springframework.validation.FieldError> fieldErrors =
                bindingResult.getFieldErrors();
        List<FieldError> errors = fieldErrors.stream()
                .map(error -> new FieldError(
                        error.getField(),
                        error.getRejectedValue() == null ?
                                "" : error.getRejectedValue().toString(),
                        error.getDefaultMessage()))
                .collect(Collectors.toList());

        return new ErrorResponse("Body 요청이 잘못되었습니다.", 400, errors);
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> constraintViolations){

        List<FieldError> errors = constraintViolations.stream()
                .map(constraintViolation -> new FieldError(
                        constraintViolation.getPropertyPath().toString(),
                        constraintViolation.getInvalidValue().toString(),
                        constraintViolation.getMessage()
                )).collect(Collectors.toList());

        return new ErrorResponse("Path 요청이 잘못되었습니다.", 400 , errors);
    }
}
