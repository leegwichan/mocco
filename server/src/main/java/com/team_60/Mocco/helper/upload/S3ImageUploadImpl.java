package com.team_60.Mocco.helper.upload;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Service
public class S3ImageUploadImpl implements S3ImageUpload{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.dir}")
    private String dir;

    private final AmazonS3Client s3Client;

    @Override
    public String upload(InputStream inputStream, String originFileName,
                         String fileSize, ImageUploadType imageUploadType) {

        String s3FileName = directoryName(imageUploadType) + newFileName(originFileName);

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(Long.parseLong(fileSize));

        s3Client.putObject(bucket, s3FileName, inputStream, objMeta);
        return s3Client.getUrl(bucket, s3FileName).toString();
    }

    private String directoryName(ImageUploadType imageUploadType){
        switch (imageUploadType){
            case MEMBER_PROFILE:
                return this.dir + "/member_profile/";
            case STUDY_IMAGE:
                return this.dir + "/study_profile/";
            case TASK_CHECK_IMAGE:
                return this.dir + "/task_check/";
        }

        return this.dir + "/";
    }

    private String newFileName(String originalFileName){

        String shortName;
        if (originalFileName.length() <= 6){
            shortName = originalFileName;
        } else {
            shortName = originalFileName.substring(originalFileName.length() - 6);
        }

        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss-SSS");
        String timeIdentifier = LocalDateTime.now().format(format);

        return timeIdentifier + "-" + shortName;
    }
}
