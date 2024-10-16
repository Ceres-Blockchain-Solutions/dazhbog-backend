import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionRepository } from './repository/position.repository';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { BN } from '@polkadot/util';

@Injectable()
export class PositionService {
  private api: ApiPromise;
  private contract: ContractPromise;
  private contractAddress: string = 'your_contract_address'; 

  constructor(private readonly positionRepository: PositionRepository) {
    this.init();
  }

  async init() {
    // const wsProvider = new WsProvider('wss://your-node-address');
    // this.api = await ApiPromise.create({ provider: wsProvider });

    // const abi = require('./your_contract_metadata.json');  // Replace with the path to your contract's metadata JSON

    // this.contract = new ContractPromise(this.api, abi, this.contractAddress)
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
}
