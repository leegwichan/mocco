package com.team_60.Mocco.security.oauth;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
//userRequest에 담긴 정보를 확인할 수 있는 메서드
//userRequest.getClientRegistration() //provider
//userRequest.getAccessToken().getTokenValue()
//super.loadUser(userRequest).getAttributes()
    private final MemberRepository memberRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);
        String provider = userRequest.getClientRegistration().getClientId();
        int providerId = oauth2User.getAttribute("id");
        log.info(providerId+" : providerId 깃헙에서 받아온 것 ");
        String nickname = oauth2User.getAttribute("login");

        Member member = updateMember(String.valueOf(providerId),nickname);

        return new PrincipalDetails(member, oauth2User.getAttributes());

    }
    private Member updateMember(String providerId,String nickname){
        Member member = memberRepository.findByProviderId(providerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PROVIDER_ID_NOT_FOUND));
        if(!member.getGithubNickname().equals(nickname)){
            member.setGithubNickname(nickname);
            return memberRepository.save(member);
        }
        return member;
    }

}

