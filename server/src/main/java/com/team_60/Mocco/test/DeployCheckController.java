package com.team_60.Mocco.test;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping
public class DeployCheckController {

    @GetMapping
    public ResponseEntity deployHealthCheck(){
        return new ResponseEntity(HttpStatus.OK);
    }

}
