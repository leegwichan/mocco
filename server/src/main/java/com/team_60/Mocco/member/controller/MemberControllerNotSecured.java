package com.team_60.Mocco.member.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
public class MemberControllerNotSecured {

    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity postMapping(@RequestBody MemberDto.Post requestBody){

        Member member = mapper.memberPostDtoToMember(requestBody);
        // TODO 비밀번호 암호화 필요

        Member postMember = memberService.createMember(member);
        MemberDto.Response response = mapper.memberToMemberResponseDto(postMember);

        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }
}
