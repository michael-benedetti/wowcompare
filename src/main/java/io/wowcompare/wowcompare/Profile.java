package io.wowcompare.wowcompare;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Profile {
        Double lastModified;
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
