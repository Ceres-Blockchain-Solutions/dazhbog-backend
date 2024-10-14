import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionRepository } from './repository/position.repository';

@Injectable()
export class PositionService {
  constructor(private readonly positionRepository: PositionRepository) {}

  async create(createPositionDto: CreatePositionDto) {
    return (await this.positionRepository.create(createPositionDto)).toObject();
  }

  async remove(position_id: number) {
    return await this.positionRepository.delete(position_id);
  }

  findAll() {
    return `This action returns all position`;
  }

  findOne(id: number) {
    return `This action returns a #${id} position`;
  }

  async update(position_id: number, updatePositionDto: UpdatePositionDto) {
    return await this.positionRepository.update(position_id, updatePositionDto);
  }
}
