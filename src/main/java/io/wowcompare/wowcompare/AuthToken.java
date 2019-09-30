package io.wowcompare.wowcompare;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
class AuthToken {
    @JsonProperty("access_token")
    String accessToken;
    @JsonProperty("token_type")
    String tokenType;
    @JsonProperty("expires_in")
    String expiresIn;
}
