import { APIRequestContext, APIResponse, expect, request } from "@playwright/test";
import { logAction, logVerification } from "../core/logs.core";

/** 
 * Utility class for API methods.
 * @author Ketan Pardeshi  
 * */
export class APIUtils 
{
  /**
   * Verify status code of API response.
   * 
   * @param _response API response.
   * @param expectedResposeCode expected response code
   * Example: 
   * 
   * verifyStatusCode(_response, 200);
   */
public async verifyStatusCode(_response: APIResponse, expectedResposeCode: number)
{
    const verificationResult = _response.status() === expectedResposeCode ? "PASSED" : "Failed";
    logVerification(`VERIFICATION: ${verificationResult} Expected Status code: '${expectedResposeCode}' Actual: '${_response.status()}'` );
    expect(_response.status()).toBe(expectedResposeCode);
}

/**
   * This method will log the response in log file.
   * 
   * @param _response API response.

   * Example: 
   * 
   * logResponse(_response);
   */
public async logResponse(_response: APIResponse)
{
    logVerification("Recieved Response is: ");
    let reponseContent = await _response.json();
    logVerification(reponseContent);
}


/**
   * Verify key value in response.
   * 
   * @param _response API response.
   * @param key key of the response
   * @param expectedValue Expected value which needs to verify
   * 
   * Example: 
   * 
   * Response: 
   * {
   *    Name: "Test User", 
   *    Age: 25
   * }
   * 
   * verifyResponseContent(_response, "Name", "Test User");
   */

public async verifyResponseContent(_response: APIResponse, key: string, expectedValue: any)
{
    let jsonReponse = await _response.json();
    let actualValue = this.extractResponseValue(jsonReponse, key)
    const verificationResult = expectedValue === actualValue ? "PASSED" : "Failed";
    logVerification(`VERIFICATION: ${verificationResult} Expected value for Key: '${key}' is '${expectedValue}' Actual: '${actualValue}'` );
    expect(expectedValue).toBe(actualValue);
}


/**
   * This method extract the response value from the response for given key.
   * 
   * @param jsonData Json response.
   * @param key key of the response
   * 
   * Example: 
   * 
   * Response: 
   * {
   *    Name: "Test User", 
   *    Age: 25
   * }
   * 
   * let name = extractResponseValue(_response, "Name");
   */

public extractResponseValue(jsonData: JSON, key:string)
  {
    let jsonString = JSON.stringify(jsonData);
    var value = JSON.parse(jsonString)[key]
    return value;
  }

}