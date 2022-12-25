import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ValidationException } from "@/domain/exceptions/validation_exception";
import { RegisterUsecase } from "@/domain/usecases/user/register_usecase";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserPayload } from "@/presenter/models/payloads/user/create-user.payload";
import { UserViewModel } from "../models/view-models/user/user.view-model";
import { UserViewModelMapper } from "../models/view-models/user/user.view-model.mapper";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        private readonly registerUsecase: RegisterUsecase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Cadastrar um novo usuário' })
    @ApiCreatedResponse({ description: 'O usuário foi criado com sucesso', type: UserViewModel })
    public async register(
        @Body() {
            email,
            name,
            phone,
            birthDate,
            password,
        }: CreateUserPayload
    ): Promise<UserViewModel> {
        try {
            const { createdUser } = await this.registerUsecase.call({
                email,
                name,
                phone,
                birthDate,
                password,
            });

            return UserViewModelMapper.toModel(createdUser);
        } catch (error) {
            if (error instanceof ValidationException)
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}