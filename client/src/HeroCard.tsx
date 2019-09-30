import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {HeroIdentifier, Profile, WowRepository} from "./helpers/sharedInterfaces";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import HeroDetails from "./HeroDetails";
import {CenterContainer, StyledButton} from "./sharedComponents/basicStyledComponents";
import {
  THEME_PRIMARY,
  THEME_PRIMARY_DARK,
  THEME_SECONDARY,
  THEME_TERTIARY,
  THEME_TERTIARY_DARK,
  THEME_TERTIARY_LIGHT
} from "./helpers/theme";
import HordeLogo from "./resources/images/Logo-horde.png";
import AllianceLogo from "./resources/images/Logo-alliance.png";

interface HeroCardProps {
  index: number;
  deleteHero: (index: number) => void;
  wowRepository: WowRepository;
  heroIdentifier: HeroIdentifier;
  updateHero: (updatedHero: HeroIdentifier, heroIndex: number) => void;
}

interface HeroFormValues {
  realm: string;
  characterName: string;
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 175px;
  padding: 10px;
  &.MuiPaper-root {
    background-color: ${THEME_SECONDARY};
    border: 2px solid ${THEME_PRIMARY_DARK};
  }
  
  &.Alliance:before {
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 180px;
    width: 200px;
    position: absolute;
    content: ' ';
    opacity: 0.3;
    background-image: url(${AllianceLogo});
  }
  
  &.Horde:before {
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 180px;
    width: 200px;
    position: absolute;
    content: ' ';
    opacity: 0.3;
    background-image: url(${HordeLogo});
    transition: background 1.5s linear;
  }
  `;

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  `;

const WowCompareInput = styled(TextField)`
  & input {
    color: ${THEME_PRIMARY};
  }
  
  & label {
    color: ${THEME_PRIMARY_DARK};
  }
  
  & label.Mui-focused {
    color: ${THEME_PRIMARY};
  }
  
  & .MuiInput-underline:after {
    border-bottom: 2px solid ${THEME_PRIMARY};
  }
  `;

const StyledIconButton = styled(IconButton)`
  & .MuiSvgIcon-root {
    color: ${THEME_PRIMARY}
  }
  `;

const HeroContainer = styled(CenterContainer)`
  background: ${THEME_TERTIARY};
  padding: 15px;
  margin: 20px;
  border: 1px solid ${THEME_TERTIARY_LIGHT};
  border-radius: 5px;
  box-shadow: 4px 0px ${THEME_TERTIARY_DARK}, 0px 4px ${THEME_TERTIARY_DARK}, -2px 0px ${THEME_TERTIARY_LIGHT}, 0px -2px ${THEME_TERTIARY_LIGHT};
  display: grid;
  grid-gap: 20px;
  color: white;
  `;

const HeroCard: React.FC<HeroCardProps> = (props: HeroCardProps) => {
  const [formValues, setFormValues] = useState<HeroFormValues>({
    realm: props.heroIdentifier.realm,
    characterName: props.heroIdentifier.characterName
  });
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    if (props.heroIdentifier.characterName && props.heroIdentifier.realm) {
      getProfile();
    }
  }, []);

  function getProfile() {
    props.wowRepository.getProfile(formValues.realm, formValues.characterName).then((profile) => {
      setProfile(profile);
      props.updateHero({
        realm: formValues.realm,
        characterName: formValues.characterName,
        key: props.heroIdentifier.key
      }, props.index);
    });
  }

  function handleChange(event: any) {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value})
  }

  return (
    <HeroContainer>
      <StyledCard
        className={profile && profile.faction === 0 ? "Alliance" : profile && profile.faction === 1 ? "Horde" : ""}
        elevation={2}
      >
        <DeleteButtonContainer>
          <StyledIconButton
            onClick={() => props.deleteHero(props.index)}
            data-testid={`delete-hero-${props.index}`}
          >
            <Close fontSize={"small"}/>
          </StyledIconButton>
        </DeleteButtonContainer>

        <WowCompareInput
          name={"realm"}
          inputProps={{'data-testid': `realm-input-${props.index}`}}
          label="Realm"
          value={formValues.realm}
          onChange={handleChange}
        />
        <WowCompareInput
          name={"characterName"}
          inputProps={{'data-testid': `characterName-input-${props.index}`}}
          label="Character Name"
          value={formValues.characterName}
          onChange={handleChange}
        />
        <StyledButton onClick={getProfile}>Submit</StyledButton>
      </StyledCard>
      {profile &&
      <HeroDetails
        profile={profile}
        index={props.index}
      />
      }
    </HeroContainer>
  );
};

export default HeroCard