package com.team_60.Mocco.exception.businessLogic;

import lombok.Getter;

public enum ExceptionCode {

    FAIL_SEND_EMAIL(300, "이메일 주소가 잘못되었거나 서버에서 메일을 보내지 못했습니다."),
    MEMBER_NOT_FOUND(404, "멤버를 찾을 수 없습니다."),
    EMAIL_ALREADY_EXIST(400, "해당 메일을 이용하는 사용자가 이미 존재합니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}
