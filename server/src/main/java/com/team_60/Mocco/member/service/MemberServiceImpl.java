package com.team_60.Mocco.member.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.helper.password.NewPasswordManager;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final NewPasswordManager newPasswordManager;
    private final BCryptPasswordEncoder encoder;
    @Value("${image.default.member}")
    private List<String> memberDefaultImageList;

    @Override
    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    @Override
    public Member createMember(Member member) {
        findMemberByEmailExpectByNull(member.getEmail());
        findMemberByNicknameExpectNull(member.getNickname());

        member.setPassword(encoder.encode(member.getPassword()));
        String defaultImage = memberDefaultImageList.get((int) Math.floor(Math.random() * memberDefaultImageList.size()));
        member.getMyInfo().setProfileImage(defaultImage);
        return memberRepository.save(member);
    }

    @Override
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        String[] repositories = new String[]{member.getMyInfo().getGithubRepository1(),
                member.getMyInfo().getGithubRepository2(),
                member.getMyInfo().getGithubRepository3()};

        if (repositories[0] != null || repositories[1] != null || repositories[2] != null){
            checkGithubRepositories(repositories);
            findMember.getMyInfo().setGithubRepository1(repositories[0]);
            findMember.getMyInfo().setGithubRepository2(repositories[1]);
            findMember.getMyInfo().setGithubRepository3(repositories[2]);
        }

        Optional.ofNullable(member.getNickname())
                .ifPresent(nickName -> {
                    if (!nickName.equals(findMember.getNickname())){
                        findMemberByNicknameExpectNull(nickName);
                        findMember.setNickname(nickName);
                    }
                });
        Optional.ofNullable(member.getMyInfo().getProfileImage())
                        .ifPresent(image -> findMember.getMyInfo().setProfileImage(image));

        Optional.ofNullable(member.getMyInfo().getIntroduction())
                .ifPresent(introduction -> findMember.getMyInfo().setIntroduction(introduction));
        Optional.ofNullable(member.getMyInfo().getLocation())
                .ifPresent(location -> findMember.getMyInfo().setLocation(location));

        return memberRepository.save(findMember);
    }

    @Override
    public Member updatePassword(MemberDto.PatchPassword dto){
        Member findMember = findVerifiedMember(dto.getMemberId());
        if (!encoder.matches(dto.getOriginalPassword(), findMember.getPassword())){
            throw new BusinessLogicException(ExceptionCode.NOT_PASSWORD_MATCHED);
        }

        Optional.ofNullable(dto.getNewPassword())
                .ifPresent(password ->
                        findMember.setPassword(encoder.encode(password)));

        return memberRepository.save(findMember);
    }

    @Override
    public Member updateGithubInfo(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        findMemberByProviderIdExpectByNull(member.getProviderId());

        findMember.setProviderId(member.getProviderId());
        findMember.setProvider(member.getProvider());
        findMember.setGithubNickname(member.getGithubNickname());
        return memberRepository.save(findMember);
    }

    @Override
    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        memberRepository.delete(findMember);
    }

    @Override
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    @Override
    public void findMemberByNicknameExpectNull(String nickname) {
        memberRepository.findByNickname(nickname)
                .ifPresent(m -> {
                    throw new BusinessLogicException(ExceptionCode.NICKNAME_ALREADY_EXIST);
                });
    }

    @Override
    public void resetMemberPasswordByEmail(String email) {
        Member findMember = findMemberByEmailExpectByPresent(email);
        String newPassword  = newPasswordManager.makeNewPasswordAndSendTextEmail(email);
        String encodePassword = encoder.encode(newPassword);

        findMember.setPassword(encodePassword);
        memberRepository.save(findMember);
    }

    private void findMemberByEmailExpectByNull(String email){
        memberRepository.findByEmail(email)
            .ifPresent( m -> {
                throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXIST);
            });
    }

    private void findMemberByProviderIdExpectByNull(String providerId){
        memberRepository.findByProviderId(providerId)
                .ifPresent( m -> {
                    throw new BusinessLogicException(ExceptionCode.GITHUB_CONNECTION_ALREADY_EXIST);
                });
    }

    private Member findMemberByEmailExpectByPresent(String email){
        Member findMember = memberRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.EMAIL_NOT_EXIST)
                );

        return findMember;
    }

    private void checkGithubRepositories(String[] repositories){
        for (int i=0; i< repositories.length-1; i++){
            for (int j=i+1; j<repositories.length; j++){
                if (repositories[i] != null && repositories[i].equals(repositories[j]))
                    throw new BusinessLogicException(ExceptionCode.GITHUB_REPOSITORY_DUPLICATION);
            }
        }
    }
}
