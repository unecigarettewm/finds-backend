import { Module } from '@nestjs/common';
import { UsersModule } from './public/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FindsModule } from './public/finds/finds.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FindsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
