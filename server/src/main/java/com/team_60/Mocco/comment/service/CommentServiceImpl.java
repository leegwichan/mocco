package com.team_60.Mocco.comment.service;

import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.comment.repository.CommentRepository;
import com.team_60.Mocco.dto.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.dto.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final StudyService studyService;
    private final MemberService memberService;

    @Override
    public List<Comment> findCommentsByStudyId(long studyId) {

        Study findStudy = studyService.findVerifiedStudy(studyId);
        return commentRepository.findByStudyOrderByStudyDesc(findStudy);
    }

    @Override
    public Comment findComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    @Override
    public Comment createComment(Comment comment) {
        Member findMember = memberService.findVerifiedMember(comment.getMember().getMemberId());
        Study findStudy = studyService.findVerifiedStudy(comment.getStudy().getStudyId());
        comment.setMember(findMember);
        comment.setStudy(findStudy);
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());
        if (findComment.getCommentStatus() == Comment.CommentStatus.COMMENT_DELETE)
            throw new BusinessLogicException(ExceptionCode.COMMENT_DELETED);

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));
        return commentRepository.save(comment);
    }

    @Override
    public Comment deleteComment(long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        findComment.setMember(null);
        findComment.setContent(null);
        findComment.setCommentStatus(Comment.CommentStatus.COMMENT_DELETE);
        return commentRepository.save(findComment);
    }

    @Override
    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }
}
