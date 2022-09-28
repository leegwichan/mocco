package com.team_60.Mocco.member.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.aop.AuthenticationService;
import com.team_60.Mocco.helper.httpclient.GithubRestClient;
import com.team_60.Mocco.helper.httpclient.dto.GithubRestClientDto;
import com.team_60.Mocco.helper.upload.ImageUploadType;
import com.team_60.Mocco.helper.upload.S3ImageUpload;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberSubController {

    private final S3ImageUpload imageUpload;
    private final MemberMapper mapper;
    private final MemberService memberService;
    private final AuthenticationService authenticationService;
    private final GithubRestClient githubRestClient;

    @PostMapping("/image")
    public ResponseEntity memberImageUpload(@RequestParam("image") MultipartFile multipartFile,
                                            @RequestParam("file-size") String fileSize) throws IOException{

        String url = imageUpload.upload(multipartFile.getInputStream(),
                multipartFile.getOriginalFilename(), fileSize, ImageUploadType.MEMBER_PROFILE);

        return new ResponseEntity(
                new SingleResponseDto(url), HttpStatus.OK);
    }

    @PatchMapping("/password/{member-id}")
    public ResponseEntity patchPassword(@PathVariable("member-id") long memberId,
                                      @RequestBody MemberDto.PatchPassword requestBody){
        authenticationService.AuthenticationCheckWithId("memberId",memberId);
        requestBody.setMemberId(memberId);
        Member updateMember = memberService.updatePassword(requestBody);
        MemberDto.Response response = mapper.memberToMemberResponseDto(updateMember);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @PatchMapping("/github-user/{member-id}")
    public ResponseEntity patchGithubAccount(@PathVariable("member-id") long memberId,
                                            @RequestBody MemberDto.GithubInfo requestBody){
        authenticationService.AuthenticationCheckWithId("memberId",memberId);
        GithubRestClientDto.UserInfo githubUserInfo
                = githubRestClient.getGithubUserInfo(requestBody.getAuthorizationCode());
        Member member = mapper.githubRestClientUserInfoDtoToMember(githubUserInfo);
        member.setMemberId(memberId);

        Member updateMember = memberService.updateGithubInfo(member);
        MemberDto.Response response = mapper.memberToMemberResponseDto(updateMember);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

}
