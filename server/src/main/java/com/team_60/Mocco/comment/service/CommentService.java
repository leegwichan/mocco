package com.team_60.Mocco.comment.service;

import com.team_60.Mocco.comment.entity.Comment;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CommentService {

    List<Comment> findCommentsByStudyId(long studyId);
    Comment findComment(long commentId);
    Comment createComment(Comment comment);
    Comment updateComment(Comment comment);
    Comment deleteComment(long commentId);
    Comment findVerifiedComment(long commentId);
}
