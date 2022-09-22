package com.team_60.Mocco.security.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class Request {

    @Getter
    @Setter
    public static class SignUp {
        private String email;
        private String password;
        private String nickname;
    }

    @Getter
    @Setter
    public static class Login {
        private String email;
        private String password;
         public UsernamePasswordAuthenticationToken toAuthentication(){
             return new UsernamePasswordAuthenticationToken(email,password);
         }
    }


}
