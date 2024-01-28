import { ApiProperty } from '@nestjs/swagger';
import { FindDto } from 'src/public/finds/dto/find.dto';
import { PlaceDto } from './place.dto';
import { Dto } from 'src/lib/dto/Dto';

export class PlaceWithFindsDto extends Dto<PlaceDto & PlaceWithFindsDto> {
  @ApiProperty({ type: [FindDto] })
  finds: FindDto[];
}
