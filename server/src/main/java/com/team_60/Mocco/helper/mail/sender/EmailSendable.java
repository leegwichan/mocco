package com.team_60.Mocco.helper.mail.sender;

import com.team_60.Mocco.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Component
@RequiredArgsConstructor
public class EmailSendable {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    public void sendSimpleEmail(String to, String subject, String message) throws InterruptedException {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setText(message);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        javaMailSender.send(mailMessage);

        System.out.println("Sent simple email!");
    }

    public void sendTemplateEmailByChangingPassword(Member member, String subject, String newPassword) throws Exception {

        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, member.getEmail());
        message.setSubject(subject);
        message.setText(setContext(member, newPassword), "utf-8", "html");
        message.setFrom(new InternetAddress("mocco@gmail.com", "MOCCO"));

        javaMailSender.send(message);
    }

    private String setContext(Member member, String newPassword){
        Context context = new Context();
        context.setVariable("nickname", member.getNickname());
        context.setVariable("newPassword", newPassword);
        return templateEngine.process("mail_password", context);
    }
}
