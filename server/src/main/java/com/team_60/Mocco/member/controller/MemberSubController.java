package com.team_60.Mocco.member.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.upload.ImageUploadType;
import com.team_60.Mocco.helper.upload.S3ImageUpload;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberSubController {

    private final S3ImageUpload imageUpload;
    private final MemberService memberService;

    @PostMapping("/image")
    public ResponseEntity memberImageUpload(@RequestParam("image") MultipartFile multipartFile,
                                            @RequestParam("file-size") String fileSize) throws IOException{

        String url = imageUpload.upload(multipartFile.getInputStream(),
                multipartFile.getOriginalFilename(), fileSize, ImageUploadType.MEMBER_PROFILE);

        return new ResponseEntity(
                new SingleResponseDto(url), HttpStatus.OK);
    }


}
