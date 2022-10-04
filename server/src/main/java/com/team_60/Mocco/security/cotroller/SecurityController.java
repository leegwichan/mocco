package com.team_60.Mocco.security.cotroller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.httpclient.GithubRestClient;
import com.team_60.Mocco.helper.httpclient.dto.GithubRestClientDto;
import com.team_60.Mocco.helper.interceptor.IdRequired;
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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
@Validated
public class SecurityController {
    private final SecurityService securityService;
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final GithubRestClient githubRestClient;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid SecurityDto.Login login, HttpServletResponse response) throws IOException {
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
    public ResponseEntity signupMember(@RequestBody @Valid MemberDto.Post requestBody){

        Member member = mapper.memberPostDtoToMember(requestBody);

        Member postMember = memberService.createMember(member);
        MemberDto.Response response = mapper.memberToMemberResponseDto(postMember);

        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    @GetMapping("/nickname-check")
    public ResponseEntity nicknameDuplicationCheck(@RequestParam("nickname")
                                                       @Size(min = 2, max = 10, message = "닉네임은 최소 2자, 최대 10자입니다.")
                                                       @Pattern(regexp = "^[0-9a-zA-Zㄱ-ㅎ가-힣]*$",
                                                               message = "닉네임은 숫자, 영어, 한글만을 사용해야 합니다.")
                                                       String nickname){
        memberService.findMemberByNicknameExpectNull(nickname);
        return new ResponseEntity(
                new SingleResponseDto(nickname), HttpStatus.OK);
    }

    @GetMapping("/finding-password")
    public ResponseEntity resetPassword(@RequestParam @Email(message = "이메일 형식어야 합니다.") String email){
        memberService.resetMemberPasswordByEmail(email);
        return new ResponseEntity(
                new SingleResponseDto<>(email), HttpStatus.OK
        );
    }
    @PostMapping("/github-login")
    public ResponseEntity githubLogin (@RequestBody MemberDto.GithubInfo requestBody, HttpServletResponse response) throws IOException {
        GithubRestClientDto.UserInfo githubUserInfo
                = githubRestClient.getGithubUserInfo(requestBody.getAuthorizationCode());
        Member member = mapper.githubRestClientUserInfoDtoToMember(githubUserInfo);

        return securityService.githubLogin(member,response);
    }
//    @GetMapping("/successLogin")
//    public ResponseEntity successLoginPage(HttpServletRequest request, HttpServletResponse response){
//        log.info("로그인 성공 페이지로 이동");
//        String success = "로그인 성공";
//        return new ResponseEntity<>(new SingleResponseDto<>(success),HttpStatus.OK);
//    }
}
