package com.team_60.Mocco.helper.upload;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.io.InputStream;

public class S3ImageUploadMock implements S3ImageUpload{
    @Override
    public String upload(InputStream inputStream, String originFileName, String fileSize, ImageUploadType imageUploadType) {
        System.out.println("이미지 업로드 기능 작동 완료!");
        return "https://lh3.googleusercontent.com/a/AItbvmlNqWbFFrIg4XcOAZPWF_7k3EHyuqNgKD_Rtli_=s360-p-rw-no";
    }
}
