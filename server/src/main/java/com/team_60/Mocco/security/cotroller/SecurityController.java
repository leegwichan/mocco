package com.team_60.Mocco.security.cotroller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.security.dto.SecurityDto;
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
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody SecurityDto.Login login, HttpServletResponse response) throws IOException {
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

    @PostMapping("/signup")
    public ResponseEntity signupMember(@RequestBody MemberDto.Post requestBody){

        Member member = mapper.memberPostDtoToMember(requestBody);

        Member postMember = memberService.createMember(member);
        MemberDto.Response response = mapper.memberToMemberResponseDto(postMember);

        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    @GetMapping("/nickname-check")
    public ResponseEntity nicknameDuplicationCheck(@RequestParam("nickname") String nickname){

        memberService.findMemberByNicknameExpectNull(nickname);
        return new ResponseEntity(
                new SingleResponseDto(nickname), HttpStatus.OK);
    }

    @GetMapping("/finding-password")
    public ResponseEntity resetPassword(@RequestParam String email){

        memberService.resetMemberPasswordByEmail(email);
        return new ResponseEntity(
                new SingleResponseDto<>(email), HttpStatus.OK
        );
    }
}
