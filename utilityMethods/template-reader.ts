import { URLData } from '../Models/Framework/URLData';
import { LoginData } from '../Models/Framework/LoginData';

export class FileReader {

  public readUserLoginDetails(): LoginData[] {
    const json = require('../testData/loginUserDetails.json');
    return json as LoginData[];
  }

 public readBrowserURLDetails(): URLData[] {
    const json = require('../testData/browserURL.json');
    return json as URLData[];
  }

}
