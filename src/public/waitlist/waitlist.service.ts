import { Injectable } from '@nestjs/common';
import { WaitlistSignupDto } from './dto/waitlistSignup.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WaitlistService {
  constructor(private readonly prisma: PrismaService) {}

  async signupToWaitlist(waitlistSignupDto: WaitlistSignupDto) {
    return await this.prisma.waitlister.create({
      data: {
        email: waitlistSignupDto.email,
        instagram: waitlistSignupDto.instagram,
        location: waitlistSignupDto.location,
      },
    });
  }
}
