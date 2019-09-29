package io.wowcompare.wowcompare;

import java.io.IOException;

public interface WowRepository {
    String getToken();

    Profile getProfile(String realm, String characterName) throws IOException;
}
