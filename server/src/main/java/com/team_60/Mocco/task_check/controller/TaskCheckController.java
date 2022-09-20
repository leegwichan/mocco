package com.team_60.Mocco.task_check.controller;


import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.task_check.dto.TaskCheckDto;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import com.team_60.Mocco.task_check.mapper.TaskCheckMapper;
import com.team_60.Mocco.task_check.service.TaskCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class TaskCheckController {
    private final TaskCheckService taskCheckService;
    private final TaskCheckMapper mapper;

    @GetMapping("/{task-check-id}")
    public ResponseEntity getTaskCheck(@RequestParam("task-check-id") long taskCheckId){

        TaskCheck taskCheck = taskCheckService.getTaskCheck(taskCheckId);
        TaskCheckDto.Response response = mapper.taskCheckToTaskCheckResponseDto(taskCheck);
        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity postTaskCheck(@RequestBody TaskCheckDto.Post request){

        TaskCheck taskCheck = mapper.taskCheckPostDtoToTaskCheck(request);
        TaskCheck postTaskCheck = taskCheckService.postTaskCheck(taskCheck);
        TaskCheckDto.Response response = mapper.taskCheckToTaskCheckResponseDto(postTaskCheck);
        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

}
