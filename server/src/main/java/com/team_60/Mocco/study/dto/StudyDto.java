package com.team_60.Mocco.study.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class StudyDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class SubResponse{
        private String image;
        private String teamName;
        private int capacity;
        private String summary;
    }
}
