import type { FullConfig } from '@playwright/test';
import { SendEmail } from '../utilityMethods/sendEmail';

async function globalTearDown(config: FullConfig) {
    //let sendEmail = new SendEmail();
    //await sendEmail.SendExecutionResultReport();
}

export default globalTearDown;