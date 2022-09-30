package com.team_60.Mocco.study.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.aop.AuthenticationService;
import com.team_60.Mocco.study.dto.StudyProgressDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.mapper.StudyProgressMapper;
import com.team_60.Mocco.study.service.StudyProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/api/study-progress")
@RequiredArgsConstructor
@Validated
public class StudyProgressController {

    private final StudyProgressService studyProgressService;
    private final StudyProgressMapper studyProgressMapper;
    private final AuthenticationService authenticationService;

    @GetMapping("/{study-id}/member/{member-id}")
    public ResponseEntity getStudyProgress(@PathVariable("study-id") @Positive long studyId,
                                           @PathVariable("member-id") @Positive long memberId){
        authenticationService.AuthenticationCheckStudyMember(studyId);
        Study findStudy = studyProgressService.findStudyWhenMemberMatched(studyId, memberId);
        StudyProgressDto.Response response = studyProgressMapper.studyToStudyProgressResponseDto(findStudy, memberId);

        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/sub/{study-id}/member/{member-id}")
    public ResponseEntity getStudyProgressSubResponse(@PathVariable("study-id") @Positive long studyId,
                                                      @PathVariable("member-id") @Positive long memberId){
        authenticationService.AuthenticationCheckStudyMember(studyId);
        Study findStudy = studyProgressService.findStudyWhenMemberMatched(studyId, memberId);
        StudyProgressDto.SubResponse response = studyProgressMapper.studyToStudyProgressSubResponseDto(findStudy, memberId);

        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/rule/{study-id}")
    public ResponseEntity getStudyRule(@PathVariable("study-id") @Positive long studyId){
        authenticationService.AuthenticationCheckStudyMember(studyId);
        Study findStudy = studyProgressService.findStudy(studyId);
        StudyProgressDto.PatchRule response = studyProgressMapper.studyToStudyProgressResponseRuleDto(findStudy);

        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @PatchMapping("/rule/{study-id}")
    public ResponseEntity patchStudyRule(@PathVariable("study-id") @Positive long studyId,
                                         @RequestBody @Valid StudyProgressDto.PatchRule requestBody){
        authenticationService.AuthenticationCheckStudyMember(studyId);
        Study study = studyProgressMapper.studyProgressResponseRuleDtoToStudy(requestBody);
        study.setStudyId(studyId);
        Study findStudy = studyProgressService.patchStudyRule(study);
        StudyProgressDto.PatchRule response = studyProgressMapper.studyToStudyProgressResponseRuleDto(findStudy);

        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

}
