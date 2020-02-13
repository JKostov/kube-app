import { IsNumber, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly clusterId: string;

  @IsString()
  readonly ipAddress: string;

  @IsNumber()
  readonly cpus: string;

  @IsNumber()
  readonly memory: string;

  @IsNumber()
  readonly storageMemory: string;
}
