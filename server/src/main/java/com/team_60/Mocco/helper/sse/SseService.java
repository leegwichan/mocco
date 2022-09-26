package com.team_60.Mocco.helper.sse;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class SseService {

    private static final Map<String, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    public SseEmitter subscribe(Member member){
        SseEmitter emitter = new SseEmitter(15 * 60 * 1000L);
        String emitterId = member.getMemberId() + "_" + System.currentTimeMillis();
        sseEmitters.put(emitterId, emitter);

        emitter.onTimeout(() -> sseEmitters.remove(emitterId));
        emitter.onCompletion(() -> sseEmitters.remove(emitterId));
        return emitter;
    }

    public void publishAlarm(Member member){
        sseEmitters.forEach((id, emitter) -> {
            try {
                if (id.startsWith(member.getMemberId() + "_")){
                    emitter.send(new SingleResponseDto("알람이 도착했습니다."), MediaType.APPLICATION_JSON);
                    log.info("send SSE id : {}", member.getMemberId());
                }
            } catch (Exception e){
                log.info("Fail Send SSE id : {}", member.getMemberId());
            }
        });
    }
}
