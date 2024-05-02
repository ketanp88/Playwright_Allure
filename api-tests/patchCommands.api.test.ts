import { test } from './setupAPIFixtures';
test("Verify get request for getting users data", async ({request, apiUtils}) => {
   const _response =  await request.patch("users/4625513", {
      data:{
         "name": "Testingggg User",
         "gender": "male",
         "id": 4625513
      }
   });
   await apiUtils.verifyStatusCode(_response, 200);
   await apiUtils.verifyResponseContent(_response, "gender","male");
});