import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class PaginationOptionsQuery {
    @ApiPropertyOptional({
        description: 'Página desejada',
        name: 'page',
        example: 1,
        default: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @Transform(({ value }) => Number(value))
    page?: number;

    @ApiPropertyOptional({
        description: 'Número de itens por página',
        name: 'limit',
        example: 10,
        default: 5,
    })
    @IsOptional()
    @Type(() => Number)
    @Transform(({ value }) => Number(value))
    limit?: number;
}