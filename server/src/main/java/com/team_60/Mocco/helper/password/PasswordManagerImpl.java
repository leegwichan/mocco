package com.team_60.Mocco.helper.password;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.helper.mail.sender.EmailSendable;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Random;

@Profile("deploy")
@Component
@RequiredArgsConstructor
public class PasswordManagerImpl implements NewPasswordManager {

    private final EmailSendable emailSend;

    @Override
    public String makeNewPasswordAndSendTextEmail(String email) {

        String newPassword = makeNewPassword();

        try {
            emailSend.send(new String[]{email}, "Mocco 비밀번호가 변경되었습니다.",
                    "비밀번호가 " + newPassword + "로 변경되었습니다.\n웹 페이지로 돌아가 비밀번호를 변경해주세요.");
        } catch (InterruptedException e){
            throw new BusinessLogicException(ExceptionCode.FAIL_SEND_EMAIL);
        }

        return newPassword;
    }

    private String makeNewPassword(){
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < targetStringLength; i++) {
            int randomLimitedInt = leftLimit + (int)
                    (random.nextFloat() * (rightLimit - leftLimit + 1));
            sb.append((char) randomLimitedInt);
        }

        return sb.toString();
    }


}
