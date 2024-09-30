import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto'; 
import { UsersService } from 'src/users/users.service';
import { Expense } from './schema/expense.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<Expense>,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, createExpenseDto: CreateExpenseDto) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
  
    const expense = new this.expenseModel({
      ...createExpenseDto,
      userId: userId, 
    });    await expense.save();
  
    user.expenses.push({
      name: expense.name,
      amount: expense.amount,
    });
    await user.save();
  
    return expense;
  }

  findAll() {
    return this.expenseModel.find().populate('userId'); 
  }

  async findOne(id: string) {
    const expense = await this.expenseModel.findById(id).populate('userId'); 
    if (!expense) {
      throw new NotFoundException(`Expense not found`);
    }
    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.expenseModel.findById(id);
    if (!expense) {
      throw new NotFoundException(`Expense not found`);
    }
    return this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, { new: true });
  }

  async remove(id: string) {
    const expense = await this.expenseModel.findById(id);
    if (!expense) {
      throw new NotFoundException(`Expense not found`);
    }
    return this.expenseModel.findByIdAndDelete(id);
  }
}
