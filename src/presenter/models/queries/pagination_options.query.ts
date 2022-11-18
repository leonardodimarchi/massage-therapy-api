import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class PaginationOptionsQuery {
    @ApiPropertyOptional({
        description: 'Página desejada',
        name: 'page',
        example: 1,
        default: 1,
    })
    @Type(() => Number)
    @IsOptional({ message: 'Por favor, envie a página desejada' })
    page?: number;

    @ApiPropertyOptional({
        description: 'Número de itens por página',
        name: 'limit',
        example: 10,
        default: 5,
    })
    @Type(() => Number)
    @IsOptional()
    limit?: number;
}