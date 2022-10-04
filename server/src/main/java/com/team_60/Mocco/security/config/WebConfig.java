package com.team_60.Mocco.security.config;

import com.team_60.Mocco.helper.interceptor.TokenInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Slf4j
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","http://www.gwichanlee.shop",
                        "https://api.github.com/**","https://github.com/**", "https://mocco.kr")
                .allowedHeaders("*")
                .allowedMethods("GET", "POST", "PATCH", "OPTIONS", "DELETE")
                .exposedHeaders("AccessToken", "RefreshToken")
                .allowCredentials(true);
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/api/register/**","/api/study-info/**","/h2/**","/api/test/**",
                        "/api/*/list",
                        "/login/oauth2/**","/oauth2/authorization/github");
    }
    @Bean
    public TokenInterceptor tokenInterceptor() {
        return new TokenInterceptor();
    }
}
