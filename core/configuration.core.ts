
const automationSettings = require('../ExecutionSettings.json');
const appConfigurations = require('../AppConfigurations.json');
/** 
 * Class to initilize all variables required for execution
 * @author Ketan Pardeshi  
 * */
export class Configuration 
{

  public static Environment = "PROD";
  public static EmailRecievers = "ketan.arunpardeshi@adactin.com;";

  public static get environment() {
    if (!automationSettings.environment.includes("#{environment}#")) {
      return automationSettings.environment;
    }
    return Configuration.Environment;
  }

  public static get emailRecievers() {
    if (!automationSettings.environment.includes("#{emailRecievers}#")) {
      return automationSettings.emailRecievers;
    }
    return Configuration.EmailRecievers;
  }

  public static get configurationData(): JSON {
    if (Configuration.Environment == "PROD") {
      return appConfigurations.PROD;
    } else if (Configuration.Environment == "STAGE") {
      return appConfigurations.STAGE;
    } else {
      return appConfigurations.QA;
    }
  }

  public static get(key:string)
  {
    const jsonData: JSON = Configuration.configurationData;
    let jsonString = JSON.stringify(jsonData);
    var value = JSON.parse(jsonString)[key]
    return value;
  }


}
