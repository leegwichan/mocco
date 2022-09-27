package com.team_60.Mocco.alarm.service;

import com.team_60.Mocco.alarm.entity.Alarm;

import java.util.List;

public interface AlarmService {
    List<Alarm> findAlarmsByMemberId(long memberId);
    void deleteAlarm(long alarmId);
    void deleteAlarmsByMemberId(long memberId);
}
