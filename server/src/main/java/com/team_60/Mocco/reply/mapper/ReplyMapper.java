package com.team_60.Mocco.reply.mapper;

import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.reply.dto.ReplyDto;
import com.team_60.Mocco.reply.entity.Reply;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReplyMapper {

    static ReplyDto.Response replyToReplyResponseDto(Reply reply){
        return new ReplyDto.Response(
                reply.getReplyId(),
                reply.getContent(),
                reply.getCreatedAt(),
                reply.getModifiedAt(),
                MemberMapper.memberToMemberSubResponseDto(reply.getMember())
        );
    }
}
