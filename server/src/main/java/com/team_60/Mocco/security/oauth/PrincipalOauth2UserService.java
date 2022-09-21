package com.team_60.Mocco.security.oauth;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import com.team_60.Mocco.security.filter.JwtConstants;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import com.team_60.Mocco.security.oauthEntity.OAuth;
import com.team_60.Mocco.security.repository.OAuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
//userRequest에 담긴 정보를 확인할 수 있는 메서드
//userRequest.getClientRegistration() //provider
//userRequest.getAccessToken().getTokenValue()
//super.loadUser(userRequest).getAttributes()
    private final JwtTokenProvider jwtTokenProvider;
    private final HttpServletRequest httpServletRequest;
    private final MemberRepository memberRepository;
    private final OAuthRepository oauthRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("userRequest : " + userRequest);
        OAuth2User oauth2User = super.loadUser(userRequest);
        String provider = userRequest.getClientRegistration().getClientId();
        String providerId = oauth2User.getAttribute("id");

        OAuth oauth = new OAuth();
        oauth.setProvider(provider);
        oauth.setProviderId(providerId);
        oauthRepository.save(oauth);

        return new PrincipalDetails(new Member(),oauth2User.getAttributes());
    }
}

