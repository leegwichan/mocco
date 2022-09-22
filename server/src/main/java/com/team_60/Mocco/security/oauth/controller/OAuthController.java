package com.team_60.Mocco.security.oauth.controller;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.exception.oauth.OAuthLogicException;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.security.dto.Request;
import com.team_60.Mocco.security.oauthEntity.OAuth;
import com.team_60.Mocco.security.repository.OAuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OAuthController {
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final OAuthRepository oauthRepository;
    @PostMapping
    public ResponseEntity postOAuth(@RequestBody Request.OAuth oauthDto){
        Member member = memberService.findVerifiedMember(oauthDto.getMemberId());
        Optional<OAuth> optionalOAuth = oauthRepository.findById(oauthDto.getOauthId());
        OAuth oauth = optionalOAuth.orElseThrow(()->new BusinessLogicException(ExceptionCode.OAUTH_NOT_FOUND));
        member.setProvider(oauth.getProvider());
        member.setProviderId(oauth.getProviderId());
        member.setGithubNickname(oauth.getNickname());
        memberRepository.save(member);
        oauthRepository.delete(oauth);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
