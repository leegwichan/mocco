package com.team_60.Mocco.comment.controller;

import com.team_60.Mocco.comment.dto.CommentDto;
import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.comment.mapper.CommentMapper;
import com.team_60.Mocco.comment.service.CommentService;
import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.aop.AuthenticationService;
import com.team_60.Mocco.helper.aop.AuthenticationServiceLocal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;
    private final AuthenticationServiceLocal authenticationService;

    @GetMapping
    public ResponseEntity getComments(@RequestParam("study-id") long studyId){

        List<Comment> findComments = commentService.findCommentsByStudyId(studyId);
        List<CommentDto.Response> responses = mapper.commentsToCommentResponseDtos(findComments);
        return new ResponseEntity(
                new SingleResponseDto(responses), HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") long commentId){

        Comment findComment = commentService.findComment(commentId);
        CommentDto.Response response = mapper.commentToCommentResponseDto(findComment);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postComment(@RequestBody CommentDto.Post requestBody){
        authenticationService.AuthenticationCheckWithDto(requestBody);
        Comment comment = mapper.commentPostDtoToComment(requestBody);
        Comment postComment = commentService.createComment(comment);
        CommentDto.Response response = mapper.commentToCommentResponseDto(postComment);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    private ResponseEntity patchComment(@PathVariable("comment-id") long commentId,
                                        @RequestBody CommentDto.Patch requestBody){
        authenticationService.AuthenticationCheckWithId("commentId",commentId);
        Comment comment = mapper.commentPatchDtoToComment(requestBody);
        comment.setCommentId(commentId);
        Comment patchComment = commentService.updateComment(comment);
        CommentDto.Response response = mapper.commentToCommentResponseDto(patchComment);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    private ResponseEntity deleteComment(@PathVariable("comment-id") long commentId){
        authenticationService.AuthenticationCheckWithId("commentId",commentId);
        Comment deleteComment = commentService.deleteComment(commentId);
        CommentDto.Response response = mapper.commentToCommentResponseDto(deleteComment);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }


}
