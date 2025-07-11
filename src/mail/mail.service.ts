import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  emailTransport() {
    const port = Number(this.configService.get<string>('SMTP_PORT'));
    const isSecure = port === 465; // 465 = SSL, 587 = STARTTLS, 25 = Non-secure

    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port,
      secure: isSecure, // true for 465, false for others
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    } as SMTPTransport.Options);

    return transporter;
  }

  async sendEmail(recipient: string, token: string) {
    const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;
    const transport = this.emailTransport();
    const options: nodemailer.SendMailOptions = {
      from: `"Care Sync" <${this.configService.get<string>('EMAIL_USER')}>`,
      to: recipient,
      subject: 'Password Reset Request',
      html: `<p> You requested a password reset. Click on the link below to reset your password:</p> <p> <a href="${resetLink}">${resetLink}</a></p>`,
    };
    try {
      await transport.sendMail(options);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
