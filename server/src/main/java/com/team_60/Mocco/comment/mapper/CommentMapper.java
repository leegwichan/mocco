package com.team_60.Mocco.comment.mapper;

import com.team_60.Mocco.comment.dto.CommentDto;
import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.reply.dto.ReplyDto;
import com.team_60.Mocco.reply.mapper.ReplyMapper;
import com.team_60.Mocco.study.entity.Study;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    default Comment commentPostDtoToComment(CommentDto.Post dto){
        Comment comment = new Comment();

        Member member = new Member();
        member.setMemberId(dto.getMemberId());
        Study study = new Study();
        study.setStudyId(dto.getStudyId());

        comment.setContent(dto.getContent());
        comment.setMember(member);
        comment.setStudy(study);
        return comment;
    }

    Comment commentPatchDtoToComment(CommentDto.Patch dto);

    CommentDto.Response commentToCommentResponseDto(Comment comment);

    List<CommentDto.Response> commentsToCommentResponseDtos(List<Comment> comments);
}
