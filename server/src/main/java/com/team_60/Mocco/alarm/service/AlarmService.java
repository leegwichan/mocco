package com.team_60.Mocco.alarm.service;

import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface AlarmService {
    SseEmitter publishAlarm(long memberId);
    List<Alarm> findAlarmsByMemberId(long memberId);
    void deleteAlarm(long alarmId);
    void deleteAlarmsByMemberId(long memberId);
    Alarm createAlarmWhenStudyOpen(Study study, Member member);
    Alarm createAlarmWhenStudyNotOpen(Study study, Member member);
    Alarm createAlarmWhenProposalApprove(Study study, Member member);
}
