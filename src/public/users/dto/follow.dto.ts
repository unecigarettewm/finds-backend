import { Dto } from 'src/lib/dto/Dto';

export class FollowDto extends Dto<FollowDto> {
  id: number;
  followerId: number;
  followingId: number;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
}
