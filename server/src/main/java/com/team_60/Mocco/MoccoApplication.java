package com.team_60.Mocco;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MoccoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoccoApplication.class, args);
	}

}
