import { CommonMethods } from "../utilityMethods/commonMethods.core";
import { test } from './setupAPIFixtures';
import { CreateUser } from "../Models/API/CreateUser";
test("Verify get request for getting users data", async ({request, apiUtils}) => {
   let emailId = CommonMethods.generateRandomString(5) + CommonMethods.generateRandomNumber(4) + "@test.com";

   let body: CreateUser = { name: "Test User", email: emailId, gender: "male", status: "active" }
   
   const _response =  await request.post("users", {
      data:body
   });
   await apiUtils.logResponse(_response);
   await apiUtils.verifyStatusCode(_response, 201);
   await apiUtils.verifyResponseContent(_response, "email",emailId);
   
   
});