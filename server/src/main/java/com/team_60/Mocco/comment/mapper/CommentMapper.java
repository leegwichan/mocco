package com.team_60.Mocco.comment.mapper;

import com.team_60.Mocco.comment.dto.CommentDto;
import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.study.entity.Study;
import org.mapstruct.Mapper;
import org.mapstruct.SubclassMapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = MemberMapper.class)
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
