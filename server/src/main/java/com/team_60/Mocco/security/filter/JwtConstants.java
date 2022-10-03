package com.team_60.Mocco.security.filter;

public class JwtConstants {

    public static final long MINUTE = 1000 * 60;
    public static final long HOUR = 60 * MINUTE;
    public static final long DAY = 24 * HOUR;
    public static final long MONTH = 30 * DAY;

    public static final long ACCESS_TOKEN_EXP = 30 * MINUTE;
    public static final long REFRESH_TOKEN_EXP = 40 * MINUTE;
    //secret
    public static final String JWT_SECRET = "jwt_secret_key_Team_60";

    //header
    public static final String ACCESS_TOKEN_HEADER = "AccessToken";
    public static final String REFRESH_TOKEN_HEADER = "RefreshToken";
    public static final String TOKEN_HEADER_PREFIX = "Bearer ";
}
