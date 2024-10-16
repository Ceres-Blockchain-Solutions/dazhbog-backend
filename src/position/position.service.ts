import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionRepository } from './repository/position.repository';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { BN } from '@polkadot/util';
import axios from 'axios';

@Injectable()
export class PositionService {
  private api: ApiPromise;
  private contract: ContractPromise;
  private contractAddress: string = 'your_contract_address'; 
  private readonly baseUrl = 'https://api.binance.com';

  constructor(private readonly positionRepository: PositionRepository) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async updateOraclePrice() {
    const price = await this.getDotPrice();

    console.log(price);
  }

  async create(createPositionDto: CreatePositionDto) {
    // await this.contract.tx.open_position(
    //   { value: 0 },
    //   createPositionDto.token,
    //   createPositionDto.amount,
    //   createPositionDto.position_type,
    //   createPositionDto.leverage,
    //   createPositionDto.user,
    // );

    return (await this.positionRepository.create(createPositionDto)).toObject();
  }

  async remove(position_id: number) {
    return await this.positionRepository.delete(position_id);
  }

  async findAll() {
    return await this.positionRepository.findAll();
  }

  async findOne(position_id: number) {
    return await this.positionRepository.findOne(position_id);
  }

  async update(position_id: number, updatePositionDto: UpdatePositionDto) {
    return await this.positionRepository.update(position_id, updatePositionDto);
  }

  async getDotPrice(): Promise<number> {
    try {
      const url = `${this.baseUrl}/api/v3/ticker/price?symbol=DOTUSDT`;
      const response = await axios.get(url);
      const price = parseFloat(response.data.price);

      return price;
    } catch (error) {
      console.error('Error fetching price:', error.message);
      throw error;
    }
  }


}
