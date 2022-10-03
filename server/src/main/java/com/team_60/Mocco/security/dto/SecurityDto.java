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

//        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=/`]).{8,20}$",
//                message = "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상, 20자 이하이어야 합니다.")
         private String password;
         public UsernamePasswordAuthenticationToken toAuthentication(){
             return new UsernamePasswordAuthenticationToken(email,password);
         }
    }


}
