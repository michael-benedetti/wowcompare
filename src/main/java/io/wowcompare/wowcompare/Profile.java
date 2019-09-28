package io.wowcompare.wowcompare;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Profile {
        Integer lastModified;
        String name;
        String realm;
        String battlegroup;
        @JsonProperty("class")
        Integer clazz;
        Integer race;
        Integer gender;
        Integer level;
        Integer achievementPoints;
        String thumbnail;
        String calcClass;
        Integer faction;
        Object items;
        Object[] talents;
        Integer totalHonorableKills;
}
