package com.team_60.Mocco.proposal.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.interceptor.IdRequired;
import com.team_60.Mocco.proposal.dto.ProposalDto;
import com.team_60.Mocco.proposal.entity.Proposal;
import com.team_60.Mocco.proposal.mapper.ProposalMapper;
import com.team_60.Mocco.proposal.service.ProposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/proposals")
@RequiredArgsConstructor
public class ProposalController {

    private final ProposalService proposalService;
    private final ProposalMapper mapper;

    @GetMapping
    public ResponseEntity getProposalsByStudyId(@RequestParam("study-id") long studyId){
        List<Proposal> findProposals = proposalService.findProposalsByStudyId(studyId);
        List<ProposalDto.Response> responses = mapper.proposalsToProposalResponseDtos(findProposals);

        return new ResponseEntity(
                new SingleResponseDto(responses), HttpStatus.OK);
    }

    @IdRequired
    @PostMapping
    public ResponseEntity postProposal(@RequestBody ProposalDto.Post requestBody, HttpServletRequest request){
        requestBody.setMemberId((Long) request.getAttribute("memberId"));
        Proposal proposal = mapper.proposalPostDtoToProposal(requestBody);
        Proposal postProposal = proposalService.createProposal(proposal);
        ProposalDto.Response response = mapper.proposalToProposalResponseDto(postProposal);

        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.CREATED);
    }

    @DeleteMapping("/{proposal-id}")
    public ResponseEntity deleteProposal(@PathVariable("proposal-id") long proposalId){
        proposalService.deleteProposal(proposalId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{proposal-id}/approve")
    public ResponseEntity approveProposal(@PathVariable("proposal-id") long proposalId){
        Proposal patchProposal = proposalService.approveProposal(proposalId);
        ProposalDto.Response response = mapper.proposalToProposalResponseDto(patchProposal);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @PatchMapping("/{proposal-id}/denied")
    public ResponseEntity deniedProposal(@PathVariable("proposal-id") long proposalId){
        Proposal patchProposal = proposalService.refuseProposal(proposalId);
        ProposalDto.Response response = mapper.proposalToProposalResponseDto(patchProposal);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }
}
