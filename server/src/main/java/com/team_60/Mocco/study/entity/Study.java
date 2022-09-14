package com.team_60.Mocco.study.entity;

import com.team_60.Mocco.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Study extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long study_id;

    @Column(length = 30, nullable = false)
    private String team_name;

    @Column(length = 50, nullable = false)
    private String summary;

    @Column(length = 5000, nullable = false)
    private String detail;

    @Column(length = 2000, nullable = false)

}
