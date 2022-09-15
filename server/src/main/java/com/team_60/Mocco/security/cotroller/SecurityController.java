package com.team_60.Mocco.security.cotroller;

import com.team_60.Mocco.security.dto.Request;
import com.team_60.Mocco.security.dto.Response;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import com.team_60.Mocco.security.service.SecurityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
public class SecurityController {
    private final JwtTokenProvider jwtTokenProvider;
    private final SecurityService securityService;


    @PostMapping("/sign-up")
    public ResponseEntity signIn(@RequestBody Request.SignUp signUp){
        return securityService.signUp(signUp);
    }
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Request.Login login, HttpServletResponse response) throws IOException {
        return securityService.login(login,response);
    }
    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request){
        return securityService.logout(request);
    }
    @PostMapping("/refresh")
    public ResponseEntity refresh(HttpServletRequest request, HttpServletResponse response) throws IOException {
        return securityService.refresh(request,response);

    }
//    @GetMapping("/authority")
//    public ResponseEntity authority(HttpServletRequest request){
//        log.info("add ROLE_ADMIN");
//        return securityService.authority(request);
//    }

    @GetMapping("/userTest")
    public ResponseEntity userTest(HttpServletRequest request){
        log.info("ROLE_USER TEST");

        return new ResponseEntity<>(HttpStatus.OK);
    }
//    @GetMapping("/adminTest")
//    public ResponseEntity adminTest(){
//        log.info("ROLE_ADMIN TEST");
//
//        return new ResponseEntity(HttpStatus.OK);
//    }


}
