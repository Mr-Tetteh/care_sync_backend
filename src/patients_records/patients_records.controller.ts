import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PatientsRecordsService } from './patients_records.service';
import { CreatePatientsRecordDto } from './dto/create-patients_record.dto';
import { UpdatePatientsRecordDto } from './dto/update-patients_record.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('patients-records')
export class PatientsRecordsController {
  constructor(
    private readonly patientsRecordsService: PatientsRecordsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPatientsRecordDto: CreatePatientsRecordDto) {
    return this.patientsRecordsService.create(createPatientsRecordDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.patientsRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsRecordsService.findOne(+id);
  }

  @Get('patients/:id')
  @UseGuards(AuthGuard)
  findByUserId(@Param('id') userId: number) {
    return this.patientsRecordsService.findByUserId(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePatientsRecordDto: UpdatePatientsRecordDto,
  ) {
    return this.patientsRecordsService.update(+id, updatePatientsRecordDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.patientsRecordsService.remove(+id);
  }
}
