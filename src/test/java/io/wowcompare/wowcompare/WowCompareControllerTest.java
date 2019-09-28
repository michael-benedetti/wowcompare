package io.wowcompare.wowcompare;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.io.IOException;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class WowCompareControllerTest {
    @Mock
    private WowRepository wowRepository;
    private WowController wowController;

    private Profile testProfile = Profile.builder()
        .name("Demospheus")
        .build();

    @Before
    public void setup() {
        wowController = new WowController(wowRepository);
    }

    @Test
    public void getToken_returnsAnAuthToken() {
        wowController.getToken();
        verify(wowRepository).getToken();
    }

    @Test
    public void getProfile_returnsAProfileFetchedFromRepository() throws IOException {
        when(wowRepository.getProfile(eq("duskwood"), eq("Demospheus"))).thenReturn(testProfile);
        Object profile = wowController.getProfile("duskwood", "Demospheus");

        verify(wowRepository).getProfile("duskwood", "Demospheus");
        Assert.assertEquals(testProfile, profile);
    }
}
