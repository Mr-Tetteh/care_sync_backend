import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('email')
  async sendEmail(@Body('to') to: string) {
    await this.mailService.sendAppointmentEmail(to);
    return { success: true, message: 'Email sent successfully' };
  }
}
