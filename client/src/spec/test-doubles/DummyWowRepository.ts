import {Profile, WowRepository} from "../../helpers/sharedInterfaces";
import {basicProfile} from "./stubObjects";

class DummyWowRepository implements WowRepository {
  public getProfile(realm: string, characterName: string) {
    return Promise.resolve(basicProfile as Profile);
  };

  public getToken() {
    return Promise.resolve();
  }
}

export default DummyWowRepository