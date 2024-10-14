import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsString,
} from 'class-validator';

export enum PositionType {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export class CreatePositionDto {
  @IsNotEmpty()
  @IsNumber()
  position_id: number;

  @IsNotEmpty()
  @IsBoolean()
  state: boolean;

  @IsNotEmpty()
  @IsNumber()
  token: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  leverage: number;

  @IsNotEmpty()
  @IsEnum(PositionType)
  position_type: PositionType;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsNumber()
  position_value: number;

  @IsNumber()
  creation_time: number;
}
