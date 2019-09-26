package io.wowcompare.wowcompare;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
