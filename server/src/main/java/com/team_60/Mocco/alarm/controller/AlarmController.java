package com.team_60.Mocco.alarm.controller;

import com.team_60.Mocco.alarm.dto.AlarmDto;
import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.alarm.mapper.AlarmMapper;
import com.team_60.Mocco.alarm.service.AlarmService;
import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.aop.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {

    private final AlarmService alarmService;
    private final AlarmMapper alarmMapper;
    private final AuthenticationService authenticationService;

    @GetMapping("/subscribe")
    public SseEmitter alarmSubscribe(@RequestParam("member-id") @Positive long memberId){
        authenticationService.AuthenticationCheckWithId("memberId",memberId);
        return alarmService.publishAlarm(memberId);
    }

    @GetMapping
    public ResponseEntity getAlarmsByMemberId(@RequestParam("member-id") @Positive long memberId){
        authenticationService.AuthenticationCheckWithId("memberId",memberId);
        List<Alarm> findAlarms = alarmService.findAlarmsByMemberId(memberId);
        List<AlarmDto.Response> response = alarmMapper.alarmsToAlarmResponseDtos(findAlarms);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @DeleteMapping("/{alarm-id}")
    public ResponseEntity deleteAlarm(@PathVariable("alarm-id") @Positive long alarmId){
        authenticationService.AuthenticationCheckWithId("alarmId",alarmId);
        alarmService.deleteAlarm(alarmId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    private ResponseEntity deleteAlarmsByMemberId(@RequestParam("member-id") @Positive long memberId){
        authenticationService.AuthenticationCheckWithId("memberId",memberId);
        alarmService.deleteAlarmsByMemberId(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
