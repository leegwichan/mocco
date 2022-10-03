package com.team_60.Mocco.task_check.controller;


import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.helper.interceptor.IdRequired;
import com.team_60.Mocco.helper.upload.ImageUploadType;
import com.team_60.Mocco.helper.upload.S3ImageUpload;
import com.team_60.Mocco.task_check.dto.TaskCheckDto;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import com.team_60.Mocco.task_check.mapper.TaskCheckMapper;
import com.team_60.Mocco.task_check.service.TaskCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Positive;
import java.io.IOException;

@RestController
@RequestMapping("/api/task-check")
@RequiredArgsConstructor
@Validated
public class TaskCheckController {
    private final TaskCheckService taskCheckService;
    private final TaskCheckMapper mapper;
    private final S3ImageUpload imageUpload;

    @GetMapping("/{task-check-id}")
    public ResponseEntity getTaskCheck(@PathVariable("task-check-id") @Positive long taskCheckId){
        TaskCheck taskCheck = taskCheckService.findTaskCheck(taskCheckId);
        TaskCheckDto.Response response = mapper.taskCheckToTaskCheckResponseDto(taskCheck);
        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @IdRequired
    @PostMapping
    public ResponseEntity postTaskCheck(@RequestBody @Valid TaskCheckDto.Post requestBody, HttpServletRequest request){
        requestBody.setMemberId((Long) request.getAttribute("memberId"));
        TaskCheck taskCheck = mapper.taskCheckPostDtoToTaskCheck(requestBody);
        TaskCheck postTaskCheck = taskCheckService.createTaskCheck(taskCheck);
        TaskCheckDto.Response response = mapper.taskCheckToTaskCheckResponseDto(postTaskCheck);
        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PostMapping("/image")
    public ResponseEntity taskCheckImageUpload(@RequestParam("image") MultipartFile multipartFile,
                                               @RequestParam("file-size") @Max(value = 5000000, message = "크기는 최대 5MB 입니다.")
                                               String fileSize) throws IOException {

        String url = imageUpload.upload(multipartFile.getInputStream(),
                multipartFile.getOriginalFilename(), fileSize, ImageUploadType.TASK_CHECK_IMAGE);

        return new ResponseEntity(
                new SingleResponseDto(url), HttpStatus.OK);
    }

}
