package com.team_60.Mocco.helper.mail.sender;

import org.springframework.stereotype.Component;

@Component
public interface EmailSendable {

    void send(String[] to, String subject, String Message) throws InterruptedException;
}
