package com.team_60.Mocco.reply.service;

import com.team_60.Mocco.comment.service.CommentService;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.reply.entity.Reply;
import com.team_60.Mocco.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService{

    private final ReplyRepository replyRepository;
    private final MemberService memberService;
    private final CommentService commentService;

    @Override
    public Reply findReply(long replyId) {
        return null;
    }

    @Override
    public Reply createReply(Reply reply) {
        return null;
    }

    @Override
    public Reply updateReply(Reply reply) {
        return null;
    }

    @Override
    public Reply deleteReply(long replyId) {
        return null;
    }

    private Reply findVerifiedReply(long replyId){
        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        Reply findReply = optionalReply.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));
        return findReply;
    }
}
