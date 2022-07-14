import { IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  public address: string;

  @IsString()
  public city: string;

  @IsString()
  public district: string;

  @IsString()
  public state: string;

  @IsString()
  public country: string;
}
