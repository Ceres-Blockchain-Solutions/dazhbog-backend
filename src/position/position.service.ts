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
    const wsProvider = new WsProvider('wss://your-node-address');
    this.api = await ApiPromise.create({ provider: wsProvider });
  }

  async create(createPositionDto: CreatePositionDto) {
    const contractAddress = 'your_contract_address';
    const contract = await this.api.contract.at(contractAddress);

    const { gasConsumed, result } = await contract.tx.openPosition(
      { value: 0 },
      createPositionDto.token,
      createPositionDto.amount,
      createPositionDto.position_type,
      createPositionDto.leverage,
      createPositionDto.user,
    );

    if (result.isOk) {
      console.log(`Position opened with gas used: ${gasConsumed}`);
    } else {
      console.error(`Failed to open position`);
    }

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
