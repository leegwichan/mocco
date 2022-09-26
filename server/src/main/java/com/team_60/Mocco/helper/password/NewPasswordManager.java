package com.team_60.Mocco.helper.password;

import org.springframework.stereotype.Component;

@Component
public interface NewPasswordManager {
    String makeNewPasswordAndSendTextEmail(String email);
}
