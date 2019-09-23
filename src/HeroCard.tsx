import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {HeroIdentifier, Profile, WowRepository} from "./helpers/sharedInterfaces";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import HeroDetails from "./HeroDetails";
import {CenterContainer} from "./sharedComponents/basicStyledComponents";
import {THEME_PRIMARY, THEME_QUATERNARY, THEME_SECONDARY, THEME_TERTIARY} from "./helpers/theme";

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
  padding: 10px;
  margin: 30px;
  &.MuiPaper-root {
    background-color: ${THEME_QUATERNARY};
    border: 2px solid ${THEME_PRIMARY};
  }
  `;

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  `;

const WowCompareInput = styled(TextField)`
  & input {
    color: ${THEME_SECONDARY};
  }
  
  & label {
    color: ${THEME_PRIMARY};
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

const StyledButton = styled(Button)`
  &.MuiButton-root {
    color: ${THEME_PRIMARY}
  }
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
    <CenterContainer>
      <StyledCard elevation={2}>
        <DeleteButtonContainer>
          <StyledIconButton
            onClick={() => props.deleteHero(props.index)}
            data-testid={`delete-hero-${props.heroIdentifier.key}`}
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
    </CenterContainer>
  );
};

export default HeroCard