package com.team_60.Mocco.security.repository;

import com.team_60.Mocco.security.oauthEntity.OAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OAuthRepository extends JpaRepository<OAuth, Long> {
}
