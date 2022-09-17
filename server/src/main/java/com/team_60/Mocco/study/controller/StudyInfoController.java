package com.team_60.Mocco.study.controller;

import java.util.List;

import com.team_60.Mocco.dto.MultiResponseDto;
import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.mapper.StudyMapper;
import com.team_60.Mocco.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/study-info")
public class StudyInfoController {
    private final StudyService studyService;
    private final StudyMapper studyMapper;

    @GetMapping("/board")
    public ResponseEntity getBoards(@RequestParam int page,
                                    @RequestParam int size){
        //스터디 여러개 보이는 페이지(페이지네이션 필요)
        Page<Study> studyPage = studyService.findStudies(page -1,size);
        List<Study> studyList = studyPage.getContent();
        return new ResponseEntity(
                new MultiResponseDto<>(studyMapper.studiesToStudySubResponseDtos(studyList),studyPage),
                HttpStatus.OK);
   }
    @GetMapping("/board/{study-id}")
    public ResponseEntity getBoard(@PathVariable("study-id") long studyId){
        //스터디 모집 글 상세 페이지 (댓글. 대댓글도 조회)
        Study study = studyService.findStudy(studyId);
        return new ResponseEntity(
                new SingleResponseDto<>(studyMapper.studyToStudyResponseDto(study)),
                        HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity getFoundBoard(@RequestParam String query,
                                        @RequestParam int page,
                                        @RequestParam int size){
        //검색어 입력 받아 검색어가 있는 스터디 조회해서 보여주는 페이지(페이지네이션)
        Page<Study> findStudyPage = studyService.searchStudies(query,page-1,size);
        List<Study> findStudyList = findStudyPage.getContent();
        return new ResponseEntity(
                new MultiResponseDto<>(studyMapper.studiesToStudySubResponseDtos(findStudyList),findStudyPage),
                        HttpStatus.OK);
    }


}
