import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('/open-position')
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @Delete('/close-position:position_id')
  remove(@Param('position_id') position_id: number) {
    return this.positionService.remove(position_id);
  }

  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }

  @Patch('/update-position:position_id')
  update(
    @Param('position_id') position_id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.update(+position_id, updatePositionDto);
  }
}
