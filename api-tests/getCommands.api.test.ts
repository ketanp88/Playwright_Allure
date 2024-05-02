import { Configuration } from "../core/configuration.core";
import { test } from './setupAPIFixtures';

test("Verify get request for getting users data", async ({request, apiUtils}, testInfo) => {
   const _response =  await request.get("users")
   apiUtils.verifyStatusCode(_response, 200);
});

test("Verify get request for getting Posts data", async ({request, apiUtils}, testInfo) => {
    const _response =  await request.get("posts")
    apiUtils.verifyStatusCode(_response, 200);
 });

 test("Verify get request for getting comments data", async ({request, apiUtils}, testInfo) => {
   const _response =  await request.get("comments")
   apiUtils.verifyStatusCode(_response, 200);
});

test("Verify get request for getting Todo  data", async ({request, apiUtils}, testInfo) => {
   const _response =  await request.get("todos")
   apiUtils.verifyStatusCode(_response, 200);
});