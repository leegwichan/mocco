package com.team_60.Mocco.study.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.aop.AuthenticationService;
import com.team_60.Mocco.helper.upload.ImageUploadType;
import com.team_60.Mocco.helper.upload.S3ImageUpload;
import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.mapper.StudyMapper;
import com.team_60.Mocco.study.service.StudyService;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task.mapper.TaskMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/study-board")
@RequiredArgsConstructor
@Slf4j
public class StudyBoardController {

    private final StudyService studyService;
    private final StudyMapper studyMapper;
    private final TaskMapper taskMapper;
    private final S3ImageUpload imageUpload;
    private final AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity postStudy(@RequestBody StudyDto.Request requestBody){
        //스터디 모집 글 작성, 등록
        authenticationService.AuthenticationCheckWithDto(requestBody);
        //taskDto -> task
        List<Task> taskList = taskMapper.taskRequestDtoListToTaskList(requestBody.getTaskList());
        //studyRequestDto -> study
        Study study = studyMapper.studyRequestDtoToStudy(requestBody, taskList);
        //study 생성
        Study createdStudy = studyService.createStudy(study);

        return new ResponseEntity(
                new SingleResponseDto<>(studyMapper.studyToStudyResponseDto(createdStudy)),
                HttpStatus.CREATED);

    }

    @PostMapping("/image")
    public ResponseEntity postStudyImage(@RequestParam("image") MultipartFile multipartFile,
                                         @RequestParam("file-size") String fileSize) throws IOException {
        String url = imageUpload.upload(multipartFile.getInputStream(),
                multipartFile.getOriginalFilename(), fileSize, ImageUploadType.STUDY_IMAGE);

        return new ResponseEntity(
                new SingleResponseDto(url), HttpStatus.OK);
    }

    @PatchMapping("/{study-id}")
    public ResponseEntity patchStudy(@PathVariable("study-id") long studyId,
                                     @RequestBody StudyDto.Request requestBody){
        //스터디 모집 글 수정
        authenticationService.AuthenticationCheckWithId("studyId",studyId);
        requestBody.setStudyId(studyId);
        List<Task> taskList = taskMapper.taskRequestDtoListToTaskList(requestBody.getTaskList());
        Study updatedStudy = studyService.updateStudy(studyMapper.studyRequestDtoToStudy(requestBody,taskList));
        return new ResponseEntity<>(
                new SingleResponseDto<>(studyMapper.studyToStudyResponseDto(updatedStudy)),
                HttpStatus.OK);
    }

    @PatchMapping("/finish-recruit/{study-id}")
    public ResponseEntity closeStudyRecruit(@PathVariable("study-id") long studyId){
        authenticationService.AuthenticationCheckWithId("studyId",studyId);
        Study study = studyService.finishRecruitStudy(studyId);
        return new ResponseEntity(
                new SingleResponseDto<>(studyMapper.studyToStudyResponseDto(study)), HttpStatus.OK);
    }
    
    @DeleteMapping("/{study-id}")
    public ResponseEntity deleteStudy(@PathVariable("study-id") long studyId){
        authenticationService.AuthenticationCheckWithId("studyId",studyId);
        //스터디 모집 글 삭제 (가능 : recruit_prograss, recruit_complete 인 경우)
        Study study = studyService.findVerifiedStudy(studyId);
        if(study.getStudyStatus()== Study.StudyStatus.STUDY_PROGRESS ||study.getStudyStatus()== Study.StudyStatus.STUDY_COMPLETE){
            return null;
        }
        studyService.deleteStudy(studyId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }
}
