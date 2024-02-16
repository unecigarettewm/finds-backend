import { Body, Controller, Post } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { WaitlistSignupDto } from './dto/waitlistSignup.dto';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post('join')
  async joinWaitlist(@Body() waitlistSignupDto: WaitlistSignupDto) {
    return this.waitlistService.signupToWaitlist(waitlistSignupDto);
  }
}
