package io.wowcompare.wowcompare;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Component
public class HttpWowRepository implements WowRepository {
    private AuthenticationDaemon authenticationDaemon;

    public HttpWowRepository(AuthenticationDaemon authenticationDaemon) {
        this.authenticationDaemon = authenticationDaemon;
        this.authenticationDaemon.setDaemon(true);
        this.authenticationDaemon.start();
    }

    public String getToken() {
        return this.authenticationDaemon.getToken();
    }

    public Profile getProfile(String realm, String characterName) throws IOException {
        RestTemplate restTemplate = new RestTemplate();

        String postUri = String.format("https://us.api.blizzard.com/wow/character/%s/%s?fields=items,talents&locale=en_US&access_token=%s", realm, characterName, authenticationDaemon.getToken());
        ResponseEntity<Profile> response = restTemplate.getForEntity(postUri, Profile.class);

        return response.getBody();
    }
}
