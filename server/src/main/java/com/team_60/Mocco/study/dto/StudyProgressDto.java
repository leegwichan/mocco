package com.team_60.Mocco.study.dto;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.task.dto.TaskDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.util.List;

public class StudyProgressDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class PatchRule {
        @Size(max = 2000, message = "스터디 규칙는 최대 2000자 입니다.")
        private String rule;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        TaskDto.MemberProgressResponse progress;
        List<MemberDto.SubResponse> memberList;
        MemberDto.SubResponse teamLeader;
        List<TaskDto.CheckResponse> taskList;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class SubResponse{
        List<TaskDto.CheckResponse> taskList;
    }
}
