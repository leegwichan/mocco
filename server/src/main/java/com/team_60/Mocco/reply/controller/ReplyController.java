package com.team_60.Mocco.reply.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.interceptor.IdRequired;
import com.team_60.Mocco.reply.dto.ReplyDto;
import com.team_60.Mocco.reply.entity.Reply;
import com.team_60.Mocco.reply.mapper.ReplyMapper;
import com.team_60.Mocco.reply.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/replies")
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;
    private final ReplyMapper mapper;

    @GetMapping("/{reply-id}")
    public ResponseEntity getReply(@PathVariable("reply-id") long replyId){

        Reply findReply = replyService.findReply(replyId);
        ReplyDto.Response response = mapper.replyToReplyResponseDto(findReply);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @IdRequired
    @PostMapping
    public ResponseEntity postReply(@RequestBody ReplyDto.Post requestBody, HttpServletRequest request){
        requestBody.setMemberId((Long) request.getAttribute("memberId"));
        Reply reply = mapper.replyPostDtoToReply(requestBody);
        Reply postReply = replyService.createReply(reply);
        ReplyDto.Response response = mapper.replyToReplyResponseDto(postReply);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{reply-id}")
    public ResponseEntity patchReply(@PathVariable("reply-id") long replyId,
                                      @RequestBody ReplyDto.Patch requestBody){
        Reply reply = mapper.replyPatchDtoToReply(requestBody);
        reply.setReplyId(replyId);
        Reply patchReply = replyService.updateReply(reply);
        ReplyDto.Response response = mapper.replyToReplyResponseDto(patchReply);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @DeleteMapping("/{reply-id}")
    public ResponseEntity deleteReply(@PathVariable("reply-id") long replyId){
        Reply deleteReply = replyService.deleteReply(replyId);
        ReplyDto.Response response = mapper.replyToReplyResponseDto(deleteReply);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

}
