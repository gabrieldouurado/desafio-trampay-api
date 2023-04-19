import { Module } from '@nestjs/common';
import { MailProvider } from './MailProvider/MailProvider';
import { SendGridMailProvider } from './MailProvider/implementations/SendGridMailProvider';

@Module({
  providers: [
    {
      provide: MailProvider,
      useClass: SendGridMailProvider,
    },
  ],
  exports: [SendGridMailProvider],
})
export class ProvidersModule {}
