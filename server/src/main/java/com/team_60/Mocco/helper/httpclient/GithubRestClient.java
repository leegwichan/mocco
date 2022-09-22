package com.team_60.Mocco.helper.httpclient;

import com.google.gson.Gson;
import com.team_60.Mocco.dto.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.dto.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.helper.httpclient.dto.GithubRestClientDto;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;


@Component
public class GithubRestClient {

    @Value("${spring.security.oauth2.client.registration.github.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.github.clientSecret}")
    private String clientSecret;

    @Autowired
    private Gson gson;

    public GithubRestClientDto.UserInfo getGithubUserInfo(String authorizationCode){
        try {
            String accessToken = takeAccessToken(authorizationCode);
            return getGithubInfo(accessToken);

        } catch (Exception e){
            throw new BusinessLogicException(ExceptionCode.REST_CLIENT_ERROR);
        }

    }

    private String takeAccessToken(String authorizationCode) throws Exception{

        HttpPost httpPost = new HttpPost();

        httpPost.addHeader("Accept", "application/json");
        httpPost.addHeader("Content-Type", "application/json");

        URI uri = new URIBuilder("https://github.com/login/oauth/access_token").build();
        httpPost.setURI(uri);
        httpPost.setConfig(getRequestConfig());

        GithubRestClientDto.Request request
                = new GithubRestClientDto.Request(clientId, clientSecret, authorizationCode);
        httpPost.setEntity(new StringEntity(gson.toJson(request)));

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpResponse httpResponse = httpClient.execute(httpPost);

        String resultJson = EntityUtils.toString(httpResponse.getEntity());
        GithubRestClientDto.Response response  = gson.fromJson(resultJson, GithubRestClientDto.Response.class);

        if (response.getAccess_token() == null){
            throw new BusinessLogicException(ExceptionCode.NOT_NORMAL_AUTHORIZATION_CODE);
        }
        return response.getAccess_token();

    }

    private GithubRestClientDto.UserInfo getGithubInfo(String accessToken) throws IOException {

        HttpGet httpGet = new HttpGet("https://api.github.com/user");
        httpGet.addHeader("Authorization","Bearer " + accessToken);
        httpGet.setConfig(getRequestConfig());

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpResponse httpResponse = httpClient.execute(httpGet);

        String resultJson = EntityUtils.toString(httpResponse.getEntity());
        GithubRestClientDto.UserInfo response  = gson.fromJson(resultJson, GithubRestClientDto.UserInfo.class);

        response.setProviderId(clientId);
        return response;
    }

    private RequestConfig getRequestConfig(){
        return RequestConfig.custom()
                .setConnectionRequestTimeout(10 * 1000)
                .setConnectTimeout(10 * 1000)
                .setSocketTimeout(10 * 1000)
                .build();
    }
}
