import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/dtos/register-dto.dtos';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dtos/user-login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ForgotPassword,
  ForgotPasswordDocument,
} from 'src/schemas/forgot-password.schema';
export interface AuthResault {
  user: Record<string, any>;
  accessToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(ForgotPassword.name)
    private readonly forgotPasswordModel: Model<ForgotPasswordDocument>,
  ) {}

  async registerUser(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, citizenId } = registerDto;
    const user = await this.userModel.findOne({ email }).lean();
    if (user) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      citizenId: citizenId,
    });

    await newUser.save();

    const payload = {
      email,
      lastName,
      firstName,
      _id: newUser._id,
    };

    const token = this.jwtService.sign(payload);

    return { user: newUser, accessToken: token };
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).lean();

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      _id: user._id,
      email,
    };

    const token = this.jwtService.sign(payload);

    return { user, accessToken: token };
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }
    const generatedCode = String(Math.floor(100000 + Math.random() * 900000));
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Reset Password Code',
      context: {
        // ✏️ filling curly brackets with content
        name: `${user.firstName} ${user.lastName}`,
      },
      text: generatedCode,
    });
    const code = await this.forgotPasswordModel.create({
      code: generatedCode,
    });
    return true;
  }
}
