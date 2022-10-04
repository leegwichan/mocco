package com.team_60.Mocco.alarm.dto;

import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.study.dto.StudyDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class AlarmDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response{
        private long alarmId;
        private Alarm.AlarmType alarmType;
        private String content;
        private StudyDto.SubResponse study;
        private String createdAt;
    }
}
