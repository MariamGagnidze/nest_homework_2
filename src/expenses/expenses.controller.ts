import { Controller, Post, Get, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UserGuard } from './expense.guard'; 
import { Request } from 'express';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

 
  @UseGuards(UserGuard)
  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(userId, createExpenseDto);
  }
  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }
}
