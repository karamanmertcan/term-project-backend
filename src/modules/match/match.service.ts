import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import {
  AddMatchUser,
  AddMatchUserDocument,
} from 'src/schemas/add-match-user.schema';
import { LikeUser, LikeUserDocument } from 'src/schemas/like-user.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(AddMatchUser.name)
    private readonly addMatchUserModel: Model<AddMatchUserDocument>,
    @InjectModel(LikeUser.name)
    private readonly likeUserModel: Model<LikeUserDocument>,
  ) {}

  async likeUser(userId: ObjectId, likedUserId: ObjectId, advertId: ObjectId) {
    const likeUser = await this.likeUserModel.findOne({
      user: userId,
      likedUser: likedUserId,
    });

    if (!likeUser) {
      const newLikeUser = new this.likeUserModel({
        user: userId,
        likedUser: likedUserId,
        advertId: advertId,
      });

      await newLikeUser.save();

      await this.userModel.findByIdAndUpdate(userId, {
        $push: { interested: advertId },
      });
    }

    const likedUser = await this.likeUserModel.findOne({
      user: likedUserId,
      likedUser: userId,
    });

    const newLikeUser = await this.likeUserModel.findOne({
      user: userId,
      likedUser: likedUserId,
    });

    console.log('liked', likedUser);
    console.log('like', newLikeUser);

    if (likedUser && newLikeUser) {
      return {
        message: 'Matched',
      };
    }
  }
}
