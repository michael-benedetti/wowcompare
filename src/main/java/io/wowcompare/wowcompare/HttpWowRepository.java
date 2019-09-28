package io.wowcompare.wowcompare;

import org.springframework.stereotype.Component;

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
}
