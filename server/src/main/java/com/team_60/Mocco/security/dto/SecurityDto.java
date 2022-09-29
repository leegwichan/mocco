package com.team_60.Mocco.security.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

public class SecurityDto {

    @Getter
    @Setter
    public static class Login {
        @Email(message = "이메일 형식을 맞추어야 합니다.")
        private String email;

        @Pattern(regexp = "^[0-9a-zA-Zㄱ-ㅎ가-힣]*$",
                message = "닉네임은 숫자, 영어, 한글만을 사용해야 합니다.")
        private String password;
         public UsernamePasswordAuthenticationToken toAuthentication(){
             return new UsernamePasswordAuthenticationToken(email,password);
         }
    }


}
