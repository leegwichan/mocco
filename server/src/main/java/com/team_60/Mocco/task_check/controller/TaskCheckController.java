package com.team_60.Mocco.task_check.controller;


import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.aop.AuthenticationService;
import com.team_60.Mocco.helper.aop.AuthenticationServiceDeploy;
import com.team_60.Mocco.helper.upload.ImageUploadType;
import com.team_60.Mocco.helper.upload.S3ImageUpload;
import com.team_60.Mocco.task_check.dto.TaskCheckDto;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import com.team_60.Mocco.task_check.mapper.TaskCheckMapper;
import com.team_60.Mocco.task_check.service.TaskCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/api/task-check")
@RequiredArgsConstructor
public class TaskCheckController {
    private final TaskCheckService taskCheckService;
    private final TaskCheckMapper mapper;
    private final S3ImageUpload imageUpload;
    private final AuthenticationService authenticationService;

    @GetMapping("/{task-check-id}")
    public ResponseEntity getTaskCheck(@PathVariable("task-check-id") long taskCheckId){
        authenticationService.AuthenticationCheckWithId("taskCheckId",taskCheckId);
        TaskCheck taskCheck = taskCheckService.findTaskCheck(taskCheckId);
        TaskCheckDto.Response response = mapper.taskCheckToTaskCheckResponseDto(taskCheck);
        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postTaskCheck(@RequestBody TaskCheckDto.Post requestBody, HttpServletRequest request){
        authenticationService.AuthenticationCheckWithDto(requestBody,request);
        TaskCheck taskCheck = mapper.taskCheckPostDtoToTaskCheck(requestBody);
        TaskCheck postTaskCheck = taskCheckService.createTaskCheck(taskCheck);
        TaskCheckDto.Response response = mapper.taskCheckToTaskCheckResponseDto(postTaskCheck);
        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PostMapping("/image")
    public ResponseEntity taskCheckImageUpload(@RequestParam("image") MultipartFile multipartFile,
                                            @RequestParam("file-size") String fileSize) throws IOException {

        String url = imageUpload.upload(multipartFile.getInputStream(),
                multipartFile.getOriginalFilename(), fileSize, ImageUploadType.TASK_CHECK_IMAGE);

        return new ResponseEntity(
                new SingleResponseDto(url), HttpStatus.OK);
    }

}
