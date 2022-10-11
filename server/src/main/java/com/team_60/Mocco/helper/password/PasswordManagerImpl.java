package com.team_60.Mocco.helper.password;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.helper.mail.sender.EmailSendable;
import com.team_60.Mocco.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Component
@RequiredArgsConstructor
@Transactional
public class PasswordManagerImpl implements NewPasswordManager {

    private final EmailSendable emailSend;

    @Override
    public String makeNewPasswordAndSendEmail(String email, Member member) {

        String newPassword = makeNewPassword();

        try {
            emailSend.sendTemplateEmailByChangingPassword(member, "Mocco 비밀번호가 변경되었습니다.", newPassword);
        } catch (Exception e){
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
