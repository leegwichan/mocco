package com.team_60.Mocco.alarm.controller;

import com.team_60.Mocco.alarm.dto.AlarmDto;
import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.alarm.mapper.AlarmMapper;
import com.team_60.Mocco.alarm.service.AlarmService;
import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.interceptor.IdRequired;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
@Slf4j
public class AlarmController {

    private final AlarmService alarmService;
    private final AlarmMapper alarmMapper;

    @IdRequired
    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter alarmSubscribe(@RequestParam("member-id") long memberId){
        return alarmService.subscribeAlarm(memberId);
    }

    @IdRequired
    @GetMapping
    public ResponseEntity getAlarmsByMemberId(HttpServletRequest request){
        long memberId = (long) request.getAttribute("memberId");
        List<Alarm> findAlarms = alarmService.findAlarmsByMemberId(memberId);
        List<AlarmDto.Response> response = alarmMapper.alarmsToAlarmResponseDtos(findAlarms);
        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity alarmUnsubscribe(@RequestParam("subscribe-id") String subscribeId){
        alarmService.unsubscribeAlarm(subscribeId);
        log.info("구독 해제 요청 왔음 subscribeId: {}", subscribeId);
        return new ResponseEntity(HttpStatus.OK);
    }


    @DeleteMapping("/{alarm-id}")
    public ResponseEntity deleteAlarm(@PathVariable("alarm-id") @Positive long alarmId){
        alarmService.deleteAlarm(alarmId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @IdRequired
    @DeleteMapping
    private ResponseEntity deleteAlarmsByMemberId(HttpServletRequest request){
        long memberId = (long) request.getAttribute("memberId");
        alarmService.deleteAlarmsByMemberId(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
