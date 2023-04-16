import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { AuthService } from './auth.service';
import { MessageResponse } from './dto/message.response';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponse } from './dto/sign-in.response';
import { SignUpDto } from './dto/sign-up.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<SignInResponse> {
    const signInDto = new SignInDto();
    signInDto.email = email;
    signInDto.password = password;

    return await this.authService.signIn(signInDto);
  }

  @Mutation(() => User)
  async signUp(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    const signUpDto = new SignUpDto();
    signUpDto.email = email;
    signUpDto.password = password;

    return await this.authService.signUp(signUpDto);
  }

  @Mutation(() => MessageResponse)
  async verifyAccount(
    @Args('email') email: string,
    @Args('verifyCode') verifyCode: string,
  ): Promise<MessageResponse> {
    return await this.authService.verifyAccount(email, verifyCode);
  }

  @Mutation(() => MessageResponse)
  async resendVerifyCode(
    @Args('email') email: string,
  ): Promise<MessageResponse> {
    return await this.authService.resendVerifyCode(email);
  }
}
