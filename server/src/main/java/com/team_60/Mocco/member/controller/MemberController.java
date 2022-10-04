package com.team_60.Mocco.member.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.interceptor.IdRequired;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@Slf4j
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId){
        Member findMember = memberService.findMember(memberId);
        MemberDto.Response response = mapper.memberToMemberResponseDto(findMember);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK
        );
    }

    @IdRequired
    @PatchMapping
    public ResponseEntity patchMember(HttpServletRequest request,
                                      @RequestBody @Valid MemberDto.Patch requestBody){
        Member member = mapper.memberPatchDtoToMember(requestBody);
        member.setMemberId((long) request.getAttribute("memberId"));

        Member updateMember = memberService.updateMember(member);
        MemberDto.Response response = mapper.memberToMemberResponseDto(updateMember);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK
        );
    }

    @IdRequired
    @DeleteMapping
    public ResponseEntity deleteMember(HttpServletRequest request){
        long memberId = (long) request.getAttribute("memberId");
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
