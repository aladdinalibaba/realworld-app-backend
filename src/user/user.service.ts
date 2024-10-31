import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const email = data.email.toLowerCase();

    const isExist = await this.userRepo.findOneBy({ email });

    if (isExist) {
      throw new BadRequestException('Email already exists');
    }

    const password = await bcrypt.hash(data.password, 6);

    const newUser = {
      ...data,
      password,
      email,
    };

    return await this.userRepo.save(newUser);
  }

  async findAll() {
    return await this.userRepo.find({
      relations: ['following', 'followers'],
    });
  }
}
