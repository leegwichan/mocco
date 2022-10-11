package com.team_60.Mocco.helper.password;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.helper.mail.sender.EmailSendable;
import com.team_60.Mocco.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
public class PasswordManagerMock implements NewPasswordManager{

    private final EmailSendable emailSend;

    @Override
    public String makeNewPasswordAndSendEmail(String email, Member member) {

        String newPassword = "1234";
        System.out.println("비밀번호 1234로 변경 완료!");

        return newPassword;
    }
}
