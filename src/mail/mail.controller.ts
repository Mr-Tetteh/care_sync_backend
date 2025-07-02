import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDto } from './dto/mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(@Body() mailDto: MailDto) {
    await this.mailService.sendEmail(mailDto);
    return { message: 'Email sent successfully' };
  }
}
