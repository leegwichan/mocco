package com.team_60.Mocco.helper.mail.sender;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
public class EmailSenderMock implements EmailSendable{

    @Override
    public void send(String[] to, String subject, String Message) throws InterruptedException {
        System.out.println("이메일은 전송 기능 작동 완료!");
    }

}
