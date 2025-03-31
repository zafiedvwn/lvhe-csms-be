import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program) private programRepo: Repository<Program>
  ) {}

  async create(dto: CreateProgramDto): Promise<Program> {
    return this.programRepo.save(dto);
  }

  async findAll(): Promise<Program[]> {
    return this.programRepo.find();
  }

  async findOne(id: number): Promise<Program> {
    const program = await this.programRepo.findOne({ 
      where: { id },
      relations: ['courses', 'users'] 
    });
    if (!program) throw new NotFoundException('Program not found');
    return program;
  }
}
