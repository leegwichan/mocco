package com.team_60.Mocco.security.oauth;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private PrincipalDetailsService principalDetailsService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();

        PrincipalDetails principalDetails = (PrincipalDetails) principalDetailsService.loadUserByUsername(username);

        if(!password.equals(principalDetails.getPassword()) && !bCryptPasswordEncoder.matches(password,principalDetails.getPassword())){
            throw new BadCredentialsException(username);
        }
        if(!principalDetails.isEnabled()){
            throw new BadCredentialsException(username);
        }
        return new UsernamePasswordAuthenticationToken(username,password,principalDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return false;
    }
}
