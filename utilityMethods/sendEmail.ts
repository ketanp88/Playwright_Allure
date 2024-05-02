import { BasePage } from "../core/basePage.core";
import { Configuration } from "../core/configuration.core";
/** 
 * Send Execution email to stakeholders 
 * @author Ketan Pardeshi  
 * */
export class SendEmail {

  public async SendExecutionResultReport() {
    var nodemailer = require('nodemailer');
    await new Promise(async function (fulfill, reject) {
      
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: 'AdactinAutomationTeam@gmail.com',
          pass: 'uqyywhfunzbyzezz'
        }
      });
      
      const mailOptions = {
        from: 'AdactinAutomationTeam@gmail.com',
        to: Configuration.EmailRecievers,
        subject: 'Regression Automation Test Results',
        html: '<br>Hi, </br><div></div><br> Please attachment for execution report.</br><br><div></div><br>Regards,</br><div></div><div>Automation Team</div>',
        attachments: [
          {
            filename: 'AdactinHotelAppExecutionReport.html',
            path: __dirname + './../ExecutionResult/index.html'
          },
          {
            filename: 'ExecutionLogs.log',
            path: __dirname + './../ExecutionLogs.log'
          },
        ]
      };
      await transporter.sendMail(mailOptions);
    })
  }



}