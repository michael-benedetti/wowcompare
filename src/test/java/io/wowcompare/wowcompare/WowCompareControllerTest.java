package io.wowcompare.wowcompare;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class WowCompareControllerTest {
    @Mock
    private WowRepository wowRepository;

    private WowController wowController;

    @Before
    public void setup() {
        wowController = new WowController(wowRepository);
    }

    @Test
    public void getToken_returnsAnAuthToken() {
        wowController.getToken();
        verify(wowRepository).getToken();
    }
}
