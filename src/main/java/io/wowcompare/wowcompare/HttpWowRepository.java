package io.wowcompare.wowcompare;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class HttpWowRepository implements WowRepository {
    @Value("${WOWCOMPARE_CLIENT_SECRET}")
    private String clientSecret;

    @Value("${WOWCOMPARE_CLIENT_ID}")
    private String clientId;

    public String getToken() {
        RestTemplate restTemplate = new RestTemplate();

        String postUri = "https://us.battle.net/oauth/token";

        ResponseEntity<String> response = restTemplate.postForEntity(postUri, getHttpEntity(), String.class);

        return response.getBody();
    }

    private HttpEntity<String> getHttpEntity() {
        HttpHeaders postHeaders = new HttpHeaders();
        postHeaders.add("Content-Type", "application/x-www-form-urlencoded");

        String body = String.format("client_id=%s&client_secret=%s&grant_type=client_credentials", clientId, clientSecret);

        return new HttpEntity<>(body, postHeaders);
    }
}
