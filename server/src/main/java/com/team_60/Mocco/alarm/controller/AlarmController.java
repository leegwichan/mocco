package com.team_60.Mocco.alarm.controller;

import com.team_60.Mocco.alarm.dto.AlarmDto;
import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.alarm.mapper.AlarmMapper;
import com.team_60.Mocco.alarm.service.AlarmService;
import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.interceptor.IdRequired;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {

    private final AlarmService alarmService;
    private final AlarmMapper alarmMapper;

    @IdRequired
    @GetMapping("/subscribe")
    public SseEmitter alarmSubscribe(@RequestParam("member-id") long memberId, HttpServletRequest request){
        memberId = (long) request.getAttribute("memberId");
        return alarmService.publishAlarm(memberId);
    }

    @IdRequired
    @GetMapping
    public ResponseEntity getAlarmsByMemberId(@RequestParam("member-id") long memberId, HttpServletRequest request){
        memberId = (long) request.getAttribute("memberId");
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

    @IdRequired
    @DeleteMapping
    private ResponseEntity deleteAlarmsByMemberId(@RequestParam("member-id") long memberId, HttpServletRequest request){
        memberId = (long) request.getAttribute("memberId");
        alarmService.deleteAlarmsByMemberId(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
