package com.team_60.Mocco.helper.stub;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.task.dto.TaskDto;
import com.team_60.Mocco.task.entity.Task;
import lombok.Getter;
import java.util.List;

import java.time.LocalDate;
import java.util.ArrayList;

import static com.team_60.Mocco.study.entity.Study.StudyStatus.RECRUIT_PROGRESS;

@Getter
public class StubData {

    public static Member member1 = Member.builder()
            .email("kimdoyeon@gmail.com")
            .password("1234")
            .nickname("ddd")
            .roles("ROLE_USER")
            .build();
    public static Member member2 = Member.builder()
            .email("kimdoyeon100@gmail.com")
            .password("1234")
            .nickname("dddd")
            .roles("ROLE_USER")
            .build();

    public static StudyDto.Request studyStub = StudyDto.Request.builder()
            .capacity(4)
            .rule("지각 금지")
            .summary("spring 공부할 사람 모집!")
            .detail("같이 spring 공부할 사람 모집합니다. 많은 지원 바랍니다.")
            .teamName("team60")
            .startDate(LocalDate.ofEpochDay(2022-10-01))
            .endDate(LocalDate.ofEpochDay(2022-10-30))
            .image("https://lh3.googleusercontent.com/a/AItbvmlNqWbFFrIg4XcOAZPWF_7k3EHyuqNgKD_Rtli_=s360-p-rw-no")
            .build();

}
