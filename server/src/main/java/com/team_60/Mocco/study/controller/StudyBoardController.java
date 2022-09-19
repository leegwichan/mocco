package com.team_60.Mocco.study.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.upload.ImageUploadType;
import com.team_60.Mocco.helper.upload.S3ImageUpload;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.mapper.StudyMapper;
import com.team_60.Mocco.study.service.StudyService;
import com.team_60.Mocco.study.service.StudyServiceImpl;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task.mapper.TaskMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/study-board")
@RequiredArgsConstructor
@Slf4j
public class StudyBoardController {

    private final StudyService studyService;
    private final StudyMapper studyMapper;
    private final TaskMapper taskMapper;
    private final S3ImageUpload imageUpload;

    @GetMapping
    public ResponseEntity getStudyBoard(){
        //스터디 모집 글 작성 페이지
        log.info("모집글 작성 페이지");
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity postStudy(@RequestBody StudyDto.Request requestDto){
        //스터디 모집 글 작성, 등록
        //taskDto -> task
        List<Task> taskList = taskMapper.taskRequestDtoListToTaskList(requestDto.getTaskList());
        //studyRequestDto -> study
        Study study = studyMapper.studyRequestDtoToStudy(requestDto, taskList);
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
                                     @RequestBody StudyDto.Request requestDto,
                                     HttpServletRequest request){
        //스터디 모집 글 수정
        requestDto.setStudyId(studyId);
        List<Task> taskList = taskMapper.taskRequestDtoListToTaskList(requestDto.getTaskList());
        Study updatedStudy = studyService.updateStudy(studyMapper.studyRequestDtoToStudy(requestDto,taskList), request);
        return new ResponseEntity<>(
                new SingleResponseDto<>(studyMapper.studyToStudyResponseDto(updatedStudy)),
                HttpStatus.OK);
    }

    @PatchMapping("/finish-recruit/{study-id}")
    public ResponseEntity closeStudyRecruit(@PathVariable("study-id") long studyId){
        Study study = studyService.finishRecruitStudy(studyId);
        return new ResponseEntity(
                new SingleResponseDto<>(studyMapper.studyToStudyResponseDto(study)), HttpStatus.OK);
    }
    
    @DeleteMapping("/{study-id}")
    public ResponseEntity deleteStudy(@PathVariable("study-id") long studyId,
                                      HttpServletRequest request){
        //스터디 모집 글 삭제 (가능 : recruit_prograss, recruit_complete 인 경우)
        Study study = studyService.findVerifiedStudy(studyId);
        if(study.getStudyStatus()== Study.StudyStatus.STUDY_PROGRESS ||study.getStudyStatus()== Study.StudyStatus.STUDY_COMPLETE){
            return null;
        }
        studyService.deleteStudy(studyId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }
}
