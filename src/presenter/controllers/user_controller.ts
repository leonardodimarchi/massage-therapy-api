import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { RegisterUsecase } from "@/domain/usecases/user/register_usecase";
import { UserPayload } from "@/domain/models/payloads/user_payload";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "@/presenter/dto/user/create-user.dto";
import { CreatedUserDto } from "../dto/user/created-user.dto";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        private readonly registerUsecase: RegisterUsecase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Cadastrar um novo usuário' })
    @ApiCreatedResponse({ description: 'O usuário foi criado com sucesso', type: CreatedUserDto })
    public async register(@Body() payload: CreateUserDto): Promise<CreatedUserDto> {
        try {
            const createdUser = await this.registerUsecase.call(new UserPayload(payload));

            return {
                ...createdUser
            }
        } catch (error) {
            if (error instanceof ValidationException)
                throw new HttpException(
                    error.message,
                    HttpStatus.BAD_REQUEST,
                );

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}