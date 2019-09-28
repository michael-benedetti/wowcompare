package io.wowcompare.wowcompare;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
public class WowController {
    private WowRepository wowRepository;

    public WowController(WowRepository wowRepository) {
        this.wowRepository = wowRepository;
    }

    @GetMapping("/token")
    public String getToken() {
        return wowRepository.getToken();
    }

    @GetMapping("/profile")
    public Object getProfile(@RequestParam("realm") String realm, @RequestParam("characterName") String characterName) throws IOException {
        return wowRepository.getProfile(realm, characterName);
    }
}
