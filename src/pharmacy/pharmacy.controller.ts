import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { UpdateQuantitiesDto } from './dto/update-quantities.dto'; // Add this import
import { AuthGuard } from '../auth/auth.guard';

@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPharmacyDto: CreatePharmacyDto) {
    return this.pharmacyService.create(createPharmacyDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.pharmacyService.findAllGroupedByCategory();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.pharmacyService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePharmacyDto: UpdatePharmacyDto,
  ) {
    return this.pharmacyService.update(+id, updatePharmacyDto);
  }

  // Add this new method for updating quantities
  // @Patch('update-quantities')
  // @UseGuards(AuthGuard)
  // async updateQuantities(@Body() updateQuantitiesDto: UpdateQuantitiesDto) {
  //   try {
  //     const result = await this.pharmacyService.updateQuantities(
  //       updateQuantitiesDto.items,
  //     );
  //     return {
  //       success: true,
  //       message: 'Quantities updated successfully',
  //       data: result,
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         success: false,
  //         message: error.message,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacyService.remove(+id);
  }
}
