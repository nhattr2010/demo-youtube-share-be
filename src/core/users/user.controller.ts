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

@Controller()
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
      await this.userService.create(createUserDto);
      res.status(HttpStatus.OK).send({
        status: 200,
        message: 'success',
      });
    } catch (err) {
      this.logger.error(`create new post failed with error ${err}`);
      res.status(HttpStatus.FORBIDDEN).send({
        status: 403,
        message: 'Exception error!',
      });
    }
  }
}
