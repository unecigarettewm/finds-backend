import { Module } from '@nestjs/common';
import { UsersModule } from './public/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { FindsModule } from './public/finds/finds.module';
import { PlacesModule } from './public/places/places.module';
import { SavesModule } from './public/saves/saves.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './public/search/search.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FindsModule,
    PlacesModule,
    SavesModule,
    AuthModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
