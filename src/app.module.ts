import { Module } from '@nestjs/common';
import { UsersModule } from './public/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { FindsModule } from './public/finds/finds.module';
import { PlacesModule } from './public/places/places.module';
import { SavesModule } from './public/saves/saves.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './public/search/search.module';
import { UploadModule } from './public/upload/upload.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { WaitlistModule } from './public/waitlist/waitlist.module';
import { LikesModule } from './public/likes/likes.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FindsModule,
    PlacesModule,
    SavesModule,
    AuthModule,
    SearchModule,
    UploadModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    WaitlistModule,
    LikesModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
