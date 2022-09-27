package com.team_60.Mocco.alarm.service;

import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.alarm.repository.AlarmRepository;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService{

    private final AlarmRepository alarmRepository;
    private final MemberService memberService;

    @Override
    public List<Alarm> findAlarmsByMemberId(long memberId) {

        Member findMember = memberService.findVerifiedMember(memberId);
        return alarmRepository.findByMember(findMember);
    }

    @Override
    public void deleteAlarm(long alarmId) {
        Alarm findAlarm = findVerifiedAlarm(alarmId);
        alarmRepository.delete(findAlarm);
    }

    @Override
    public void deleteAlarmsByMemberId(long memberId) {
        memberService.findVerifiedMember(memberId);
        alarmRepository.deleteAlarmByMemberId(memberId);
    }

    private Alarm findVerifiedAlarm(long alarmId){
        Optional<Alarm> optionalAlarm = alarmRepository.findById(alarmId);
        Alarm findAlarm = optionalAlarm.orElseThrow( () ->
                new BusinessLogicException(ExceptionCode.ALARM_NOT_FOUND));
        return findAlarm;
    }
}
