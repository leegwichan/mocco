package com.team_60.Mocco.helper.sse;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
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

    public SseEmitter subscribeAlarm(Member member){
        SseEmitter emitter = new SseEmitter(15 * 60 * 1000L);
        String emitterId = member.getMemberId() + "_" + System.currentTimeMillis();
        sseEmitters.put(emitterId, emitter);

        try{
            emitter.send("CONNECT", MediaType.APPLICATION_JSON);
        } catch (Exception e){
            throw new BusinessLogicException(ExceptionCode.FAIL_SSE_CONNECT);
        }

        emitter.onTimeout(() -> sseEmitters.remove(emitterId));
        emitter.onCompletion(() -> sseEmitters.remove(emitterId));
        return emitter;
    }

    public void publishAlarm(Member member){
        sseEmitters.forEach((id, emitter) -> {
            if (id.startsWith(member.getMemberId() + "_")){
                publishAlarm(emitter, member);
            }
        });
    }

    public void publishAlarm(SseEmitter emitter, Member member){
        try {
            emitter.send(new SingleResponseDto("ARRIVE_ALARM"), MediaType.APPLICATION_JSON);
            log.info("Success Send SSE id : {}", member.getMemberId());
        } catch (Exception e){
            log.info("Fail Send SSE id : {}", member.getMemberId());
        }

    }
}
