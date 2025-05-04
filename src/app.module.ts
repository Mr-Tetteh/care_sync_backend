import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/dbConfig.provider';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PatientsAppointmentModule } from './patients_appointment/patients_appointment.module';
import { PatientsRecordsModule } from './patients_records/patients_records.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
    UsersModule,
    AuthModule,
    PatientsAppointmentModule,
    PatientsRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
