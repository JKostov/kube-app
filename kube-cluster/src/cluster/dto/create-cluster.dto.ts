import { IsString } from 'class-validator';

export class CreateClusterDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly ipAddress: string;
}
