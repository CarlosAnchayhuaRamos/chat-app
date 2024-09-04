import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint para registrar un nuevo usuario
  @Post('register')
  async register(@Body() createUserDto: { username: string; password: string }): Promise<User> {
    const { username, password } = createUserDto;
    return this.usersService.createUser(username, password);
  }

//   // Endpoint para obtener un usuario por su ID
//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<User> {
//     return this.usersService.findOneById(+id);
//   }
}