package com.team_60.Mocco.security.oauthEntity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class OAuth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long oauthId;
    @Column
    private String provider;
    @Column
    private String providerId;
    @Column
    private String nickname;
}
