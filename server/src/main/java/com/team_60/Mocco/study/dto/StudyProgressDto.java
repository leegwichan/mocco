package com.team_60.Mocco.study.dto;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.task.dto.TaskDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class StudyProgressDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        TaskDto.MemberProgressResponse progress;
        List<MemberDto.SubResponse> memberList;
        List<TaskDto.CheckResponse> taskList;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class SubResponse{
        List<TaskDto.CheckResponse> taskList;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Rule {
        private String rule;
    }
}
