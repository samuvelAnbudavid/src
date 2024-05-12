//sms.controlller
import { Request, Response } from 'express';
import {  smsServce } from "../services/sms.service";

class smsController{
    public  async sendSMS(req: Request, res: Response) {
          const fast2SMS= new smsServce();
          const { to, message } = req.body;
          if (!to || !message) return res.status(400).send('To and message are required');
      
          try {
            const response =await fast2SMS.sendSMS(message, [to])
            .then(() => console.log('SMS sent successfully'))
            .catch((error:any) => {throw new Error(error.message)});
            res.send('SMS sent successfully');
          } catch (error) {
            console.error(error);
            res.status(500).send('Failed to send SMS');
          }
        }
  
  
    public  receiveSMS(req: Request, res: Response) {
      const { From, Body } = req.body; // Assuming Twilio sends From and Body in the request body
  
      console.log(`Received SMS from: ${From}, Body: ${Body}`);
      // Your logic to handle received SMS
  
      res.send('SMS received successfully');
    }
  
  //   bulksms
  public  async bulksendSMS(req: Request, res: Response) {
    const apiKey:string = 'BfSLyErvHolNcKA1Ym2CjibD094gxZzTIqFaRpw87eUMtd36uXazLiF5PocC4xBpqjOUTAwQ8fhdymlS'; 
    const fast2SMS= new smsServce();
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).send('Messages should be provided as a non-empty array');
      }
  
      try {
        await Promise.all(messages.map(async (msg: { to: string; body: string }) => {
           await fast2SMS.sendSMS(msg.body, [msg.to])
            .then(() => console.log('SMS sent successfully'))
            .catch((error:any) => {throw new Error(error.message)});
            res.send('SMS sent successfully');
       
        }));
        res.send('Bulk SMS sent successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send bulk SMS');
      }
    }

}
export default new smsController()