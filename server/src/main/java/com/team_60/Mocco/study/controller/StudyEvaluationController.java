package com.team_60.Mocco.study.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.aop.AuthenticationService;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.dto.StudyEvaluationDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.mapper.StudyEvaluationMapper;
import com.team_60.Mocco.study.service.StudyEvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/study-evaluation")
@RequiredArgsConstructor
public class StudyEvaluationController {

    private final StudyEvaluationService studyEvaluationService;
    private final StudyEvaluationMapper mapper;
    private final AuthenticationService authenticationService;

    @GetMapping("/{study-id}/member/{member-id}")
    public ResponseEntity getEvaluationInfo(@PathVariable("study-id") long studyId,
                                            @PathVariable("member-id") long memberId){
        authenticationService.AuthenticationCheckWithId("studyId",studyId);
        Study study = studyEvaluationService.getStudyByStudyEvaluation(studyId);
        StudyEvaluationDto.Response response = mapper.studyToStudyEvaluationResponseDto(study, memberId);

        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postEvaluationInfo(@RequestBody StudyEvaluationDto.Post requestBody){
        authenticationService.AuthenticationCheckWithDto(requestBody);
        List<Member> members = mapper.StudyEvaluationPostDtoToMemberList(requestBody);
        studyEvaluationService.evaluateStudyMembers(requestBody.getStudyId(), requestBody.getMemberId(), members);

        return new ResponseEntity(HttpStatus.OK);
    }
}
