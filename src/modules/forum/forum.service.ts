import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateForumPostDto } from 'src/dtos/create-forum-post.dto';
import { UpdateForumPostDto } from 'src/dtos/update-forum-post.dto';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import { Categories, Forum, ForumDocument } from 'src/schemas/forum.schema';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(Forum.name)
    private readonly forumModel: Model<ForumDocument>,
  ) {}

  async createForumPost(
    userId: ObjectId,
    createForumPostDto: CreateForumPostDto,
  ) {
    const forum = new this.forumModel({
      ...createForumPostDto,
      user: userId,
    });
    return forum.save();
  }

  getAllForumPosts() {
    return this.forumModel.find().populate('user').sort({ createdAt: -1 });
  }

  getUsersAllForumPosts(userId: ObjectId) {
    return this.forumModel
      .find({ user: userId })
      .populate('user')
      .sort({ createdAt: -1 });
  }

  //Kategoriler yazılınca denenecek
  getAllForumPostsByCategory(category: string) {
    return this.forumModel
      .find({ categories: category })
      .populate('user')
      .sort({ createdAt: -1 });
  }

  //Test edilecek.
  async deleteForumPost(userId: ObjectId, postId: ObjectId) {
    const advert = await this.forumModel
      .findOne({
        _id: postId,
      })
      .lean();
    if (!advert) {
      throw new Error('Post not found');
    }
    if (advert.user.toString() !== userId.toString()) {
      throw new Error('You are not the owner of this post');
    }
    await this.forumModel.deleteOne({
      _id: postId,
    });
    return {
      message: 'Post deleted',
    };
  }

  async getComments(postId: ObjectId) {
    const post = await this.forumModel
      .findById(postId)
      .populate('comments.user', '_id firstName lastName photoURL')
      .lean();
    return post.comments.reverse();
  }

  async addComment(postId: ObjectId, userId: ObjectId, comment: string) {
    const post = await this.forumModel
      .findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $addToSet: {
            comments: { user: userId, content: comment },
          },
        },
        { new: true },
      )
      // .populate('comments.user', '_id firstName lastName photoURL')
      .lean();
    // post.comments = post.comments.reverse();
    // if (!post) {
    //   throw new Error('Post not found');
    // }
    // if (post.user.toString() !== userId.toString()) {
    //   throw new Error('You are not the owner of posts comment');
    // }
    return post.comments;
  }

  removeComment(userId: ObjectId, postId: ObjectId, commentId: ObjectId) {
    return this.forumModel
      .findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $pull: {
            comments: {
              _id: commentId,
              user: userId,
            },
          },
        },
        { new: true },
      )
      .lean();
  }

  likePost(userId: ObjectId, postId: ObjectId) {
    return this.forumModel
      .findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $addToSet: {
            likes: userId,
          },
        },
        { new: true },
      )
      .populate('user')
      .lean();
  }

  dislikePost(userId: ObjectId, postId: ObjectId) {
    return this.forumModel
      .findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $pull: {
            likes: userId,
          },
        },
        { new: true },
      )
      .populate('user')
      .lean();
  }

  async getForumPostByCategories(categoryName: Categories) {
    const getForumPosts = await this.forumModel
      .find({
        categorie: categoryName,
      })
      .populate('user')
      .lean();

    return getForumPosts;
  }
}
