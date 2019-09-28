import {Profile, WowRepository} from "./helpers/sharedInterfaces";

class WowHttpRepository implements WowRepository {
  public async getProfile(realm: string, characterName: string): Promise<Profile> {
    return fetch(`/api/v1/profile?realm=${realm}&characterName=${characterName}`).then((response: Response) => {
      return response.json().then((responseJson: Profile) => {
        return responseJson;
      })
    })
  }
}

export default WowHttpRepository