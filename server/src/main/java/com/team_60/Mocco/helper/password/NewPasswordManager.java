package com.team_60.Mocco.helper.password;

import com.team_60.Mocco.member.entity.Member;
import org.springframework.stereotype.Component;

@Component
public interface NewPasswordManager {
    String makeNewPasswordAndSendEmail(String email, Member member);
}
