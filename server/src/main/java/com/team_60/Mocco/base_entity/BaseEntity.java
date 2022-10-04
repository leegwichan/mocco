package com.team_60.Mocco.base_entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private String createdAt = LocalDateTime.now().atZone(ZoneId.of("Asia/Seoul"))
                    .format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm"));

    @LastModifiedDate
    @Column(name = "last_modified_at")
    private String modifiedAt = LocalDateTime.now().atZone(ZoneId.of("Asia/Seoul"))
            .format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm"));
}
