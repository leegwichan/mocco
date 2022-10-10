package com.team_60.Mocco.helper.sse;

import com.team_60.Mocco.alarm.dto.AlarmDto;
import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.alarm.mapper.AlarmMapper;
import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
@RequiredArgsConstructor
public class SseService {

    private static final Map<String, SseEmitter> SSE_EMITTERS = new ConcurrentHashMap<>();
    private final AlarmMapper alarmMapper;

    public SseEmitter subscribeAlarm(Member member){
        SseEmitter emitter = new SseEmitter(30 * 60 * 1000L);
        String emitterId = member.getMemberId() + "_" + System.currentTimeMillis();
        SSE_EMITTERS.put(emitterId, emitter);

        try {
            emitter.send(new SseDto(emitterId));
            log.info("구독 성공! memberId : {}", emitterId);
        } catch (Exception e){
            log.info("구독 실패! memberId : {}", emitterId);
        }
        emitter.onTimeout(() -> SSE_EMITTERS.remove(emitterId));
        emitter.onCompletion(() -> SSE_EMITTERS.remove(emitterId));
        return emitter;
    }

    public void unsubscribeAlarm(String subscribeId){
        SseEmitter sseEmitter = SSE_EMITTERS.get(subscribeId);
        sseEmitter.complete();
        SSE_EMITTERS.remove(subscribeId);
    }

    public void publishAlarm(Member member, Alarm alarm){
        List<Alarm> alarmList = new ArrayList<>();
        alarmList.add(alarm);
        publishAlarm(member, alarmList);
    }

    public void publishAlarm(Member member, List<Alarm> alarmList){
        List<AlarmDto.Response> response = alarmMapper.alarmsToAlarmResponseDtos(alarmList);

        SSE_EMITTERS.forEach((id, emitter) -> {
            if (id.startsWith(member.getMemberId() + "_")){
                try {
                    emitter.send(response, MediaType.APPLICATION_JSON);
                    log.info("Success Send SSE id : {}", id);
                } catch (Exception e){
                    emitter.complete();
                    SSE_EMITTERS.remove(id);
                    log.info("Fail Send SSE id : {}", id);
                }
            }
        });
    }

    public void publishAlarmToEmitter(Member member, List<Alarm> alarmList, SseEmitter emitter){
        List<AlarmDto.Response> response = alarmMapper.alarmsToAlarmResponseDtos(alarmList);
        try {
            emitter.send(response, MediaType.APPLICATION_JSON);
            log.info("Success Send SSE first memberId : {}", member.getMemberId());
        } catch (Exception e){
            log.info("Fail Send SSE first memberId : {}", member.getMemberId());
        }
    }
}
