package io.wowcompare.wowcompare;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class WowcompareApplicationTests {
    @Autowired
    private MockMvc mvc;

    @LocalServerPort
    private int port;

    private String hostWithPort;

    @Before
    public void setup() {
        hostWithPort = "http://localhost:" + port;
    }

    @Test
    public void getToken_isSuccessful() throws Exception {
        mvc.perform((MockMvcRequestBuilders.get(hostWithPort + "/api/v1/token"))).andExpect(status().isOk());
    }
}
