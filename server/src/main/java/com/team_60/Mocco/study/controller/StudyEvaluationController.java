package com.team_60.Mocco.study.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
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

    @GetMapping("/{study-id}")
    public ResponseEntity getEvaluationInfo(@PathVariable("study-id") long studyId){

        // TODO 회원 정보 받아서 이미 평가 했는지 체크하는 기능 넣을 것
       Study study = studyEvaluationService.getStudyByStudyEvaluation(studyId);
        StudyEvaluationDto.Response response = mapper.studyToStudyEvaluationResponseDto(study);

        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postEvaluationInfo(@RequestBody StudyEvaluationDto.Post requestBody){

        List<Member> members = mapper.StudyEvaluationPostDtoToMemberList(requestBody);
        studyEvaluationService.evaluateStudyMembers(requestBody.getStudyId(), requestBody.getMemberId(), members);

        return new ResponseEntity(HttpStatus.OK);
    }
}
