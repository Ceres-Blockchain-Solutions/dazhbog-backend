import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionRepository } from './repository/position.repository';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { BN } from '@polkadot/util';
import axios from 'axios';
import contractAbi from "./utils/abis/oracle.json";

const contractAddress = '16WNTZoQuUAEac5ou1R5xCX944B8WhoL4aDxoVaVWWTwjcWJ';
@Injectable()
export class PositionService {
  private readonly baseUrl = 'https://api.binance.com';

  private readonly wsProvider = new WsProvider("wss://rpc1.paseo.popnetwork.xyz"); // Replace with your Substrate node
  private api: ApiPromise;


  constructor(private readonly positionRepository: PositionRepository) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async updateOraclePrice() {
    // this.api = await ApiPromise.create({ provider: this.wsProvider });
    // const contract = new ContractPromise(this.api, contractAbi, contractAddress);
    // console.log(contract);

    // const keyring = new Keyring({ type: 'sr25519' });
    // const signer = keyring.addFromUri('//Alice'); 

    const price = await this.getDotPrice();

    // await contract.tx.changePrice(
    //   {
    //     gasLimit: -1,
    //     value: 0,
    //   },
    //   new BN(price)
    // ).signAndSend(signer);

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
