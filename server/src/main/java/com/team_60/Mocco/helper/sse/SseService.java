package com.team_60.Mocco.helper.sse;

import com.team_60.Mocco.alarm.dto.AlarmDto;
import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.alarm.mapper.AlarmMapper;
import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class SseService {

    private static final Map<String, SseEmitter> sseEmitters = new ConcurrentHashMap<>();
    private final AlarmMapper alarmMapper;

    public SseEmitter subscribeAlarm(Member member){
        SseEmitter emitter = new SseEmitter(1 * 60 * 1000L);
        String emitterId = member.getMemberId() + "_" + System.currentTimeMillis();
        sseEmitters.put(emitterId, emitter);
        log.info("구독 성공! memberId : {}", member.getMemberId());

        emitter.onTimeout(() -> sseEmitters.remove(emitterId));
        emitter.onCompletion(() -> sseEmitters.remove(emitterId));
        return emitter;
    }

    public void publishAlarm(Member member, Alarm alarm){
        List<Alarm> alarmList = new ArrayList<>();
        alarmList.add(alarm);
        publishAlarm(member, alarmList);
    }

    public void publishAlarm(Member member, List<Alarm> alarmList){
        List<AlarmDto.Response> response = alarmMapper.alarmsToAlarmResponseDtos(alarmList);

        sseEmitters.forEach((id, emitter) -> {
            if (id.startsWith(member.getMemberId() + "_")){
                try {
                    emitter.send(response, MediaType.APPLICATION_JSON);
                    log.info("Success Send SSE id : {}", member.getMemberId());
                } catch (Exception e){
                    sseEmitters.remove(id);
                    log.info("Fail Send SSE id : {}", member.getMemberId());
                }
            }
        });
    }
}
