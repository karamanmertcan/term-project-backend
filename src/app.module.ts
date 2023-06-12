/* eslint-disable @typescript-eslint/no-var-requires */
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvertModule } from './modules/advert/advert.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { ForumModule } from './modules/forum/forum.module';
import { UserModule } from './modules/user/user.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import * as admin from 'firebase-admin';

import { MatchModule } from './modules/match/match.module';
import { AddMatchUserModule } from './modules/add-match-user/add-match-user.module';
import { MediaModule } from './modules/media/media.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        projectId: 'smart-pet-app-3ca9a',
        credential: admin.credential.cert(
          require('../smart-pet-app-3ca9a-firebase-adminsdk-qd6dq-557e3e2845'),
        ),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AdvertModule,
    ForumModule,
    WebsocketModule,
    ChatModule,
    MatchModule,
    AddMatchUserModule,
    MediaModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
