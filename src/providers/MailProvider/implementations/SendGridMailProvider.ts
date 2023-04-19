import SendGrid = require('@sendgrid/mail');

import { MailProvider, SendMailDTO } from '../MailProvider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendGridMailProvider implements MailProvider {
  async sendMail(data: SendMailDTO): Promise<void> {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: data.to,
      from: data.from,
      subject: data.subject,
      html: data.html,
    };

    await SendGrid.send(msg);
  }
}
