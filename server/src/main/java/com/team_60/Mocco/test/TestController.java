package com.team_60.Mocco.test;

import com.team_60.Mocco.helper.mail.sender.EmailSendable;
import com.team_60.Mocco.helper.upload.ImageUploadType;
import com.team_60.Mocco.helper.upload.S3ImageUpload;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/test")
public class TestController {

    private final EmailSendable emailSender;
    private final S3ImageUpload imageUpload;

    @GetMapping("/mail")
    public String checkSendMail(@RequestParam String email) {
        String[] mail = new String[]{email};
        try{
            emailSender.send(mail, "SEB39_MAIN_TEAM60 이메일 전송 테스트입니다.", "SEB39_MAIN_TEAM60 이메일 전송 테스트입니다.");
        } catch (Exception e){
            return "이메일 전송 실패! 에러 발생!";
        }
        return email + " 메일함 확인하세요.";
    }

    @GetMapping("/image")
    public String checkImageUpload(@RequestParam("images") MultipartFile multipartFile,
                                   @RequestParam String fileSize) throws IOException {

        String url = imageUpload.upload(multipartFile.getInputStream(),
                multipartFile.getOriginalFilename(), fileSize, ImageUploadType.MEMBER_PROFILE);

        return "image 업로드 성공 : " + url;
    }

    @GetMapping("/userTest")
    public ResponseEntity userTest(HttpServletRequest request){
        log.info("ROLE_USER TEST");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public String checkON(){
        return "우리팀 화이팅!";
    }
}
