package com.team_60.Mocco.study.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/study-board")
public class StudyBoardController {
    @GetMapping
    public ResponseEntity getStudyBoard(){
        //스터디 모집 글 작성 페이지
    }
    @PostMapping
    public ResponseEntity postStudy(){
        //스터디 모집 글 작성, 등록

    }
    @PatchMapping("/{study-id}")
    public ResponseEntity patchStudy(@PathVariable){
        //스터디 모집 글 수정
    }
    @DeleteMapping("/{study-id}")
    public ResponseEntity deleteStudy(@PathVariable){
        //스터디 모집 글 삭제 (가능 : recruit_prograss, recruit_complete 인 경우)
    }
}
