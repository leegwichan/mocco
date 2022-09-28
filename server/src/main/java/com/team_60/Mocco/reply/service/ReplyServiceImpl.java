package com.team_60.Mocco.reply.service;

import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.comment.service.CommentService;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.reply.entity.Reply;
import com.team_60.Mocco.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReplyServiceImpl implements ReplyService{

    private final ReplyRepository replyRepository;
    private final MemberService memberService;
    private final CommentService commentService;

    @Override
    @Transactional(readOnly = true)
    public Reply findReply(long replyId) {
        return findVerifiedReply(replyId);
    }

    @Override
    public Reply createReply(Reply reply) {

        Member findMember = memberService.findVerifiedMember(reply.getMember().getMemberId());
        Comment findComment = commentService.findVerifiedComment(reply.getComment().getCommentId());
        commentService.checkStudyStatusIsRecruitProgress(findComment.getStudy());

        reply.setMember(findMember);
        reply.setComment(findComment);

        return replyRepository.save(reply);
    }

    @Override
    public Reply updateReply(Reply reply) {
        Reply findReply = findVerifiedReply(reply.getReplyId());
        if (findReply.getReplyStatus() == Reply.ReplyStatus.REPLY_DELETE)
            throw new BusinessLogicException(ExceptionCode.REPLY_DELETED);
        commentService.checkStudyStatusIsRecruitProgress(findReply.getComment().getStudy());

        Optional.ofNullable(reply.getContent())
                .ifPresent(content -> findReply.setContent(content));
        return replyRepository.save(findReply);
    }

    @Override
    public Reply deleteReply(long replyId) {
        Reply findReply = findVerifiedReply(replyId);
        findReply.setMember(null);
        findReply.setContent("");
        findReply.setReplyStatus(Reply.ReplyStatus.REPLY_DELETE);
        return replyRepository.save(findReply);
    }

    public Reply findVerifiedReply(long replyId){
        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        Reply findReply = optionalReply.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));
        return findReply;
    }
}
