package com.team_60.Mocco.study.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.interceptor.IdRequired;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.dto.StudyEvaluationDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.mapper.StudyEvaluationMapper;
import com.team_60.Mocco.study.service.StudyEvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/study-evaluation")
@RequiredArgsConstructor
@Validated
public class StudyEvaluationController {

    private final StudyEvaluationService studyEvaluationService;
    private final StudyEvaluationMapper mapper;

    @IdRequired
    @GetMapping("/{study-id}")
    public ResponseEntity getEvaluationInfo(@PathVariable("study-id") @Positive long studyId,
                                            HttpServletRequest request){
        long memberId = (long) request.getAttribute("memberId");
        Study study = studyEvaluationService.getStudyByStudyEvaluation(studyId);
        StudyEvaluationDto.Response response = mapper.studyToStudyEvaluationResponseDto(study, memberId);

        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @IdRequired
    @PostMapping
    public ResponseEntity postEvaluationInfo(@RequestBody @Valid StudyEvaluationDto.Post requestBody, HttpServletRequest request){
        requestBody.setMemberId((Long) request.getAttribute("memberId"));
        List<Member> members = mapper.StudyEvaluationPostDtoToMemberList(requestBody);
        studyEvaluationService.evaluateStudyMembers(requestBody.getStudyId(), requestBody.getMemberId(), members);

        return new ResponseEntity(HttpStatus.OK);
    }
}
