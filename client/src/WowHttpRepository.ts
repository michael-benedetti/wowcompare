import {Profile, WowRepository} from "./helpers/sharedInterfaces";

class WowHttpRepository implements WowRepository {
  private token: string = "";

  constructor() {
    this.getToken();
  }

  public async getProfile(realm: string, characterName: string): Promise<Profile> {
    return fetch(`https://us.api.blizzard.com/wow/character/${realm}/${characterName}?fields=items,talents&locale=en_US&access_token=${this.token}`).then((response: Response) => {
      return response.json().then((responseJson: Profile) => {
        return responseJson;
      })
    })
  }

  public async getToken() {
    return await fetch("/api/v1/token").then((response: Response) => {
      return response.text().then((token) => {
        this.token = token;
        return;
      });
    });
  };
}

export default WowHttpRepository