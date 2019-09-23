import {Profile, WowRepository} from "./helpers/sharedInterfaces";

class WowHttpRepository implements WowRepository {
  public async getProfile(realm: string, characterName: string): Promise<Profile> {
    return fetch(`https://us.api.blizzard.com/wow/character/${realm}/${characterName}?fields=items,talents&locale=en_US&access_token=`).then((response: Response) => {
      return response.json().then((responseJson: Profile) => {
        return responseJson;
      })
    })
  }
}

export default WowHttpRepository