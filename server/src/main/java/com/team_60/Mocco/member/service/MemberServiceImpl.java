package com.team_60.Mocco.member.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    @Override
    public Member createMember(Member member) {
        findMemberByEmailExpectByNull(member.getEmail());
        return memberRepository.save(member);
    }

    @Override
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(password));
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickName -> findMember.setNickname(nickName));
        Optional.ofNullable(member.getMyInfo().getIntroduction())
                .ifPresent(introduction -> findMember.getMyInfo().setIntroduction(introduction));
        Optional.ofNullable(member.getMyInfo().getLocation())
                .ifPresent(location -> findMember.getMyInfo().setLocation(location));
        Optional.ofNullable(member.getMyInfo().getGithubRepository1())
                .ifPresent(repository -> findMember.getMyInfo().setGithubRepository1(repository));
        Optional.ofNullable(member.getMyInfo().getGithubRepository2())
                .ifPresent(repository -> findMember.getMyInfo().setGithubRepository2(repository));
        Optional.ofNullable(member.getMyInfo().getGithubRepository3())
                .ifPresent(repository -> findMember.getMyInfo().setGithubRepository3(repository));

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

    private void findMemberByEmailExpectByNull(String email){
        memberRepository.findByEmail(email)
            .ifPresent( m -> {
                throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXIST);
            });
    }
}
