import {Profile, WowRepository} from "../../helpers/sharedInterfaces";
import {basicProfile} from "../helpers/testObjects";

class DummyWowRepository implements WowRepository {
  public getProfile(realm: string, characterName: string) {
    return Promise.resolve(basicProfile as Profile);
  };
}

export default DummyWowRepository