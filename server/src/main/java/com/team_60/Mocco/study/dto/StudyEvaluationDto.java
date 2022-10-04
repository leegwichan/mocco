package com.team_60.Mocco.study.dto;

import com.team_60.Mocco.dto.PostDto;
import com.team_60.Mocco.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.List;

public class StudyEvaluationDto {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Post extends PostDto {
        @Positive(message = "Study 식별자는 양수만 들어갈 수 있습니다.")
        private long studyId;

        private List<MemberDto.PostEvaluation> evaluations;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long studyId;
        private String teamName;
        private LocalDate endDate;
        private List<MemberDto.SubResponse> memberList;
    }
}
