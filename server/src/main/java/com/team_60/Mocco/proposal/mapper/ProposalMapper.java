package com.team_60.Mocco.proposal.mapper;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.proposal.dto.ProposalDto;
import com.team_60.Mocco.proposal.entity.Proposal;
import com.team_60.Mocco.study.entity.Study;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = MemberMapper.class)
public interface ProposalMapper {

    ProposalDto.Response proposalToProposalResponseDto(Proposal proposal);

    List<ProposalDto.Response> proposalsToProposalResponseDtos(List<Proposal> proposals);

    default Proposal proposalPostDtoToProposal(ProposalDto.Post dto) {
        Member member = new Member();
        member.setMemberId(dto.getMemberId());
        Study study = new Study();
        study.setStudyId(dto.getStudyId());

        Proposal proposal = new Proposal();
        proposal.setMember(member);
        proposal.setStudy(study);
        proposal.setContent(dto.getContent());
        return proposal;
    }

}

