import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { UserEntity } from '../../model/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('/v1/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({ type: UserEntity })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async createNewPage(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(
        `create new user with information: ${JSON.stringify(createUserDto)}`,
      );
      let user = await this.userService.findByEmail(createUserDto.email);
      if (!user) {
        user = await this.userService.create(createUserDto);
      }
      delete user.password;
      res.status(HttpStatus.OK).send({
        status: 200,
        message: 'success',
        data: user,
      });
    } catch (err) {
      this.logger.error(`create new user failed with error ${err}`);
      res.status(HttpStatus.FORBIDDEN).send({
        status: 403,
        message: 'Exception error!',
      });
    }
  }
}
