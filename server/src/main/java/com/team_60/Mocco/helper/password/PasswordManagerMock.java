package com.team_60.Mocco.helper.password;

import com.team_60.Mocco.dto.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.dto.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.helper.mail.sender.EmailSendable;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("!deploy")
@Component
@RequiredArgsConstructor
public class PasswordManagerMock implements NewPasswordManager{

    private final EmailSendable emailSend;

    @Override
    public String makeNewPasswordAndSendTextEmail(String email) {

        String newPassword = "1234";
        try {
            emailSend.send(new String[]{email}, "전송 작동 확인", newPassword);
        } catch (InterruptedException e){
            throw new BusinessLogicException(ExceptionCode.FAIL_SEND_EMAIL);
        }

        return newPassword;
    }
}
