package com.team_60.Mocco.alarm.controller;

import com.team_60.Mocco.alarm.dto.AlarmDto;
import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.alarm.mapper.AlarmMapper;
import com.team_60.Mocco.alarm.service.AlarmService;
import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.sse.SseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {

    private final AlarmService alarmService;
    private final SseService sseService;
    private final AlarmMapper alarmMapper;

    @GetMapping("/subscribe")
    public SseEmitter alarmSubscribe(@RequestParam("member-id") long memberId){
        return sseService.subscribe(memberId);
    }

    @GetMapping
    public ResponseEntity getAlarmsByMemberId(@RequestParam("member-id") long memberId){
        List<Alarm> findAlarms = alarmService.findAlarmsByMemberId(memberId);
        List<AlarmDto.Response> response = alarmMapper.alarmsToAlarmResponseDtos(findAlarms);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @DeleteMapping("/{alarm-id}")
    public ResponseEntity deleteAlarm(@PathVariable("alarm-id") long alarmId){

        alarmService.deleteAlarm(alarmId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    private ResponseEntity deleteAlarmsByMemberId(@RequestParam("member-id") long memberId){

        alarmService.deleteAlarmsByMemberId(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
