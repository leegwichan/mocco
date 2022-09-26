package com.team_60.Mocco.helper.mail.sender;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Profile("deploy")
public class SimpleEmailSender implements EmailSendable{

    private final JavaMailSender javaMailSender;

    @Override
    public void send(String[] to, String subject, String message) throws InterruptedException {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setText(message);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        javaMailSender.send(mailMessage);

        System.out.println("Sent simple email!");
    }
}
