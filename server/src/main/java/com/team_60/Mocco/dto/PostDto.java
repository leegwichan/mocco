package com.team_60.Mocco.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public abstract class PostDto {
    @Positive(message = "Member 식별자는 양수만 들어갈 수 있습니다.")
    private long memberId;
}
