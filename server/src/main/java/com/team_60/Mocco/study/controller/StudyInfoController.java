package com.team_60.Mocco.study.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/study-info")
public class StudyInfoController {

    @GetMapping("/board")
    public ResponseEntity getBoards(@RequestParam int size,
                                    @RequestParam int page){
        //스터디 여러개 보이는 페이지(페이지네이션 필요)
   }
    @GetMapping("/board/{study-id}")
    public ResponseEntity getBoard(@PathVariable){
        //스터디 모집 글 상세 페이지 (댓글. 대댓글도 조회)
    }
    @GetMapping("/search")
    public ResponseEntity getFoundBoard(@RequestParam String query){
        //검색어 입력 받아 검색어가 있는 스터디 조회해서 보여주는 페이지(페이지네이션)
    }


}
