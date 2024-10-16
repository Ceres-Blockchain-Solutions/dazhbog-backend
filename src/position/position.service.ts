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
  private readonly baseUrl = 'https://api.binance.com';

  private readonly wsProvider = new WsProvider('ws://127.0.0.1:9944'); // Replace with your Substrate node
  private api: ApiPromise;
  private contractAddress = '<Your_Oracle_Contract_Address>'; // Replace with your contract address
  private contractAbi = '<Your_Oracle_Contract_ABI>'; // ABI of the Oracle contract


  constructor(private readonly positionRepository: PositionRepository) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async updateOraclePrice() {
    this.api = await ApiPromise.create({ provider: this.wsProvider });
    const contract = new ContractPromise(this.api, this.contractAbi, this.contractAddress);

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
