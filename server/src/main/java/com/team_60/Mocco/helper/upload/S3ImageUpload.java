package com.team_60.Mocco.helper.upload;

import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component
public interface S3ImageUpload {

    String upload(InputStream inputStream, String originFileName, String fileSize, ImageUploadType imageUploadType);
}
