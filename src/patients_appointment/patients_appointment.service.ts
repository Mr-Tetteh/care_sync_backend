import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePatientsAppointmentDto } from './dto/create-patients_appointment.dto';
import { UpdatePatientsAppointmentDto } from './dto/update-patients_appointment.dto';
import { PatientsAppointment } from './entities/patients_appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class PatientsAppointmentService {
  constructor(
    @InjectRepository(PatientsAppointment)
    private readonly patientAppointmentRepository: Repository<PatientsAppointment>,
    private readonly configService: ConfigService,
  ) {}

  async create(createPatientsAppointmentDto: CreatePatientsAppointmentDto) {
    const newAppointment = this.patientAppointmentRepository.create({
      full_name: createPatientsAppointmentDto.full_name,
      phone_number: createPatientsAppointmentDto.phone_number,
      appointment_date: createPatientsAppointmentDto.appointment_date,
      appointment_time: createPatientsAppointmentDto.appointment_time,
      reason: createPatientsAppointmentDto.reason,
      department: createPatientsAppointmentDto.department,
    });

    const savedAppointment =
      await this.patientAppointmentRepository.save(newAppointment);

    // Send SMS notification after successful appointment creation
    try {
      const smsMessage = `Hello ${savedAppointment.full_name}, your appointment scheduled for ${savedAppointment.appointment_date} at ${savedAppointment.appointment_time}. is currently pending. You will receive an sms when you appointment is approved`;
      await this.sendWithSMSONLINEGH(
        savedAppointment.phone_number.toString(),
        smsMessage,
      );
    } catch (error) {
      console.error('Failed to send SMS notification:', error);
    }

    return savedAppointment;
  }

  private async sendWithSMSONLINEGH(
    receiver: string,
    message: string,
    sender: string = 'Care Sync',
  ): Promise<any> {
    try {
      const baseUrl = this.configService.get<string>('SMS_GH_ONLINE_BASE_URL');
      const apiKey = this.configService.get<string>('SMS_GH_ONLINE_KEY');
      const isDebug = this.configService.get<boolean>('APP_DEBUG', false);

      const url = `${baseUrl}/v5/sms/send`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `key ${apiKey}`,
      };

      const payload = {
        text: message,
        type: 0,
        sender: sender,
        destinations: [receiver],
      };

      if (isDebug) {
        console.log('SMS Debug Mode - Would send:', payload);
        return { success: true, debug: true, payload };
      }

      const response = await axios.post(url, payload, {
        headers,
        timeout: 10000, // 10 second timeout
      });

      return response.data;
    } catch (error) {
      console.error('SMS sending error:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(
          `SMS API Error: ${error.response?.data?.message || error.message}`,
        );
      }
      throw new Error(`SMS Error: ${error.message}`);
    }
  }

  findAll() {
    return this.patientAppointmentRepository.find();
  }

  findOne(id: number) {
    return this.patientAppointmentRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updatePatientsAppointmentDto: UpdatePatientsAppointmentDto,
  ) {
    const result = await this.patientAppointmentRepository.update(
      { id },
      updatePatientsAppointmentDto,
    );

    // Send SMS notification after successful update (only if phone number is provided)
    if (
      updatePatientsAppointmentDto.phone_number &&
      updatePatientsAppointmentDto.full_name &&
      updatePatientsAppointmentDto.appointment_date &&
      updatePatientsAppointmentDto.appointment_time &&
      updatePatientsAppointmentDto.status &&
      updatePatientsAppointmentDto.selected_doctor_contact
    ) {
      try {
        const smsMessage = `Hello ${updatePatientsAppointmentDto.full_name}, your appointment scheduled for ${updatePatientsAppointmentDto.appointment_date} at ${updatePatientsAppointmentDto.appointment_time} has been ${updatePatientsAppointmentDto.status}. We hope to see you soon!`;
        await this.sendWithSMSONLINEGH(
          updatePatientsAppointmentDto.phone_number.toString(),
          smsMessage,
        );
        const doctorMessage = `Hello Doc, you have been scheduled an appointment with ${updatePatientsAppointmentDto.full_name} on ${updatePatientsAppointmentDto.appointment_date} at ${updatePatientsAppointmentDto.appointment_time}.`;
        await this.sendWithSMSONLINEGH(
          updatePatientsAppointmentDto.selected_doctor_contact.toString(),
          doctorMessage,
        );
      } catch (error) {
        console.error('Failed to send SMS notification:', error);
        // Don't throw error here, update was successful
      }
    }

    return result;
  }

  public async remove(id: number) {
    try {
      const result = await this.patientAppointmentRepository.delete(id);
      if (result.affected === 0) {
        throw new BadRequestException('Sorry appointment not found');
      }
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Sorry appointment not found');
    }
  }
}
