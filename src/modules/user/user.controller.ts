import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user';
import { ChangeUserInformationDto } from 'src/dtos/change-user-informations.dto';
import { ChatMessageDto } from 'src/dtos/chat-message.dto';
import { SetNotificationTokenDto } from 'src/dtos/notification-token.dto';
import { UpdateUserPasswordDto } from 'src/dtos/update-user-password.dto';
import { ObjectId, ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('')
  changeInformation(
    @Body() changeUserInformationDto: ChangeUserInformationDto,
    @CurrentUser() currentUser,
  ) {
    return this.userService.changeUserInformation(
      changeUserInformationDto,
      currentUser._id,
    );
  }
  @Put('changePassword')
  updateUserPassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @CurrentUser() currentUser,
  ) {
    return this.userService.updateUserPassword(
      updateUserPasswordDto,
      currentUser._id,
    );
  }
  @Put('notification-token')
  setNotificationToken(
    @CurrentUser() currentUser,
    @Body() setNotificationTokenDto: SetNotificationTokenDto,
  ) {
    return this.userService.setNotificationToken(
      currentUser._id,
      setNotificationTokenDto.notificationToken,
    );
  }
  @Post('create-chat/:friendId')
  createChat(
    @CurrentUser() currentUser,
    @Param('friendId', new ParseObjectIdPipe()) friendId: ObjectId,
  ) {
    return this.userService.createChat(currentUser._id, friendId);
  }

  @Post('send-message/:receipient')
  sendMessage(
    @CurrentUser() CurrentUser,
    @Param('receipient', new ParseObjectIdPipe()) receipient: ObjectId,
    @Body() chatMessageDto: ChatMessageDto,
  ) {
    return this.userService.sendMessage(
      CurrentUser._id,
      receipient,
      chatMessageDto,
    );
  }
  @Get('list-messages/:friendId')
  listMessages(
    @CurrentUser() currentUser,
    @Param('friendId', new ParseObjectIdPipe()) friendId: ObjectId,
  ) {

    return this.userService.listMessages(currentUser._id, friendId);
  }
  @Get()
  GetUserData(@CurrentUser() CurrentUser) {
    return this.userService.getUserData(CurrentUser._id);
  }

  @Get('list-chats')
  getUserChats(@CurrentUser() currentUser) {
    return this.userService.getUserChats(currentUser._id);
  }

  @Delete('delete-chat/:chatId')
  deleteChat(@Param('chatId', new ParseObjectIdPipe()) chatId: ObjectId) {
    return this.userService.deleteChat(chatId);
  }
}
