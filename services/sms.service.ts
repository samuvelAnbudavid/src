import axios, { AxiosResponse } from 'axios';

export class smsServce {
 

    public async sendSMS(message: string, numbers: string[]): Promise<void> {
        try {
            const apiKey = '';
            const apiUrl = 'https://www.fast2sms.com/dev/bulkV2';
          const response: AxiosResponse<any> = await axios.post(
            apiUrl,
            {
              message: message,
              language: 'english',
              route: 'q',
              numbers: numbers.join(',')
            },
            {
              headers: {
                'authorization': apiKey,
                'Content-Type': 'application/json'
              }
            }
          );
    
          console.log(response.data);
        } catch (error) {
          console.error(error);
          throw new Error('Failed to send SMS');
        }
      }
}
export default new smsServce();
