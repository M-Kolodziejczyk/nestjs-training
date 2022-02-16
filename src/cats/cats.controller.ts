import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
  UsePipes,
  DefaultValuePipe,
  ParseBoolPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, catsSchema, FindOneParams } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { JoiValidationPipe } from './validation/objectSchemaValidation';
import { ClassValidationPipe } from './validation/classValidatorPipe';
import { CustomParseIntPipe } from './validation/parse-int.pipe';

@Controller('cats')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // Object Schema Validation Pipe
  // @Post()
  // @UsePipes(new JoiValidationPipe(catsSchema))
  // async create(@Body() createCatDto: CreateCatDto) {
  //   return this.catsService.create(createCatDto);
  // }

  // Class validator pipe
  // @Post()
  // async create(@Body(new ClassValidationPipe()) createCatDto: CreateCatDto) {
  //   return this.catsService.create(createCatDto);
  // }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log('CReated', createCatDto);
    return this.catsService.create(createCatDto);
  }

  // Providing defaults

  @Get()
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return this.catsService.findAll();
  }

  // @Get(':id')
  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: boolean) {
  //   console.log('Typeof ID', typeof id);
  //   return this.catsService.findOne(+id);
  // }

  // Custom ParseIntPipe
  // @Get(':id')
  // async findOne(@Param('id', new CustomParseIntPipe()) id: number) {
  //   console.log('Typeof ID', typeof id);
  //   return this.catsService.findOne(+id);
  // }

  // Class Validator
  // @Get(':id')
  // async findOne(@Param() id: FindOneParams) {
  //   console.log('PArams', id);
  //   return this.catsService.findOne(+id);
  // }

  @Get(':id')
  async findOne(@Param() id: FindOneParams) {
    console.log('PArams', id);
    console.log('Typeof: ', typeof id.id);
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
