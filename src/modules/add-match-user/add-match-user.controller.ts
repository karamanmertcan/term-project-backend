import { FileInterceptor } from '@nest-lab/fastify-multer';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AddMatchUserService } from './add-match-user.service';
import { ApiConsumes } from '@nestjs/swagger';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddMatchUserDto } from 'src/dtos/add-match-user.dto';
import { CurrentUser } from 'src/decorators/current-user';

@UseGuards(JwtAuthGuard)
@Controller('add-match-user')
export class AddMatchUserController {
  constructor(private readonly addMatchUserService: AddMatchUserService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  uploadImageToCloudinary(@UploadedFile() file: MulterFile) {
    return this.addMatchUserService.uploadImageToCloudinary(file);
  }

  @Post('create-match-user')
  createMatchUser(
    @CurrentUser() currentUser,
    @Body() addMatchUserDto: AddMatchUserDto,
  ) {
    return this.addMatchUserService.createMatchUser(
      currentUser._id,
      addMatchUserDto,
    );
  }

  @Get('users')
  getAllUsers(@CurrentUser() currentUser) {
    return this.addMatchUserService.getAllUsers(currentUser._id);
  }
}
