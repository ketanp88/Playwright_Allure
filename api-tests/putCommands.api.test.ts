import { test } from './setupAPIFixtures';

test("Verify get request for getting users data", async ({ request, apiUtils}, testInfo) => {
   const _response =  await request.patch("users/4625463", {   
   data: {
         "id": 4625463,
         "name": "Test Test",
         "email": "llOPX5687@adactin.examle",
         "gender": "male",
         "status": "active"
      }
   });
   await apiUtils.verifyStatusCode(_response, 200);
   await apiUtils.verifyResponseContent(_response, "email","llOPX5687@adactin.examle");
});