export interface SendMailDTO {
  to: string;
  from: string;
  subject: string;
  html: string;
}

export abstract class MailProvider {
  abstract sendMail(data: SendMailDTO): Promise<void>;
}
