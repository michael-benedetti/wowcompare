package io.wowcompare.wowcompare;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Component
public class AuthenticationDaemon extends Thread{
    private String authToken;

    @Value("${WOWCOMPARE_CLIENT_SECRET}")
    private String clientSecret;

    @Value("${WOWCOMPARE_CLIENT_ID}")
    private String clientId;

    @Override
    public void run() {
        while (true) {
            try {
                this.authToken = fetchToken();
                Thread.sleep(300000);
            } catch (InterruptedException | IOException e) {
                e.printStackTrace();
            }
        }
    }

    private String fetchToken() throws IOException {
        RestTemplate restTemplate = new RestTemplate();

        String postUri = "https://us.battle.net/oauth/token";
        ResponseEntity<String> response = restTemplate.postForEntity(postUri, getHttpEntity(), String.class);

        ObjectMapper mapper = new ObjectMapper();
        AuthToken fetchedAuthToken = mapper.readValue(response.getBody(), AuthToken.class);

        return fetchedAuthToken.accessToken;
    }

    private HttpEntity<String> getHttpEntity() {
        HttpHeaders postHeaders = new HttpHeaders();
        postHeaders.add("Content-Type", "application/x-www-form-urlencoded");

        String body = String.format("client_id=%s&client_secret=%s&grant_type=client_credentials", clientId, clientSecret);

        return new HttpEntity<>(body, postHeaders);
    }

    public String getToken() {
        return this.authToken;
    }
}
