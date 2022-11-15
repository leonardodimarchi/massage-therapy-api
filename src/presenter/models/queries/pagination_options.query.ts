import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsOptional } from "class-validator";

export class PaginationOptionsQuery {
    @ApiProperty({
        description: 'Página desejada',
        required: true,
        name: 'page',
        example: 1,
    })
    @Type(() => Number)
    @IsDefined({ message: 'Por favor, envie a página desejada' })
    page: number;

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