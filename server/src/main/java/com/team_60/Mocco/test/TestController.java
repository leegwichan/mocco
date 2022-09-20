package com.team_60.Mocco.test;

import com.team_60.Mocco.helper.mail.sender.EmailSendable;
import com.team_60.Mocco.helper.stub.StubData;
import com.team_60.Mocco.helper.upload.ImageUploadType;
import com.team_60.Mocco.helper.upload.S3ImageUpload;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.study.mapper.StudyMapper;
import com.team_60.Mocco.study.service.StudyService;
import com.team_60.Mocco.task.mapper.TaskMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/test")
public class TestController {
    private final EmailSendable emailSender;
    private final S3ImageUpload imageUpload;
    private MemberService memberService;

    private StudyService studyService;
    private StudyMapper studyMapper;
    private TaskMapper taskMapper;

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
    @GetMapping("/data/user")
    public ResponseEntity userData() {
            memberService.createMember(StubData.member1);
            memberService.createMember(StubData.member2);
        log.info("유저 2개 추가 완료");
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("data/study")
    public ResponseEntity studyData(){
        for (int i = 0; i < 100; i++) {
            studyService.createStubStudy(studyMapper.studyRequestDtoToStudy(StubData.studyStub, new ArrayList<>()));
        }
        log.info("스터디 100개 추가 완료");
        return new ResponseEntity(HttpStatus.OK);
    }
}
