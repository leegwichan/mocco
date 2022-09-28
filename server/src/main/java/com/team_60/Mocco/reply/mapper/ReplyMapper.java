package com.team_60.Mocco.reply.mapper;

import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.reply.dto.ReplyDto;
import com.team_60.Mocco.reply.entity.Reply;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = MemberMapper.class)
public interface ReplyMapper {
    default Reply replyPostDtoToReply(ReplyDto.Post dto){
        Member member = new Member();
        member.setMemberId(dto.getMemberId());
        Comment comment = new Comment();
        comment.setCommentId(dto.getCommentId());

        Reply reply = new Reply();
        reply.setMember(member);
        reply.setComment(comment);
        reply.setContent(dto.getContent());
        return reply;
    }

    Reply replyPatchDtoToReply(ReplyDto.Patch dto);

    ReplyDto.Response replyToReplyResponseDto(Reply reply);
    List<ReplyDto.Response> repliesToReplyResponseDtos(List<Reply> replies);
}
