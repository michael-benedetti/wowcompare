package io.wowcompare.wowcompare;

import java.io.IOException;

public interface WowRepository {
    String getToken();

    Object getProfile(String realm, String characterName) throws IOException;
}
