import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AddMatchUser,
  AddMatchUserSchema,
} from 'src/schemas/add-match-user.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MediaModule } from '../media/media.module';
import { AddMatchUserController } from './add-match-user.controller';
import { AddMatchUserService } from './add-match-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AddMatchUser.name, schema: AddMatchUserSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MediaModule,
  ],
  controllers: [AddMatchUserController],
  providers: [AddMatchUserService],
  exports: [AddMatchUserService],
})
export class AddMatchUserModule {}
