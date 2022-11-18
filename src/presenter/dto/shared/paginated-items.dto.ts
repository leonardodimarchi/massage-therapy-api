import { ApiProperty } from "@nestjs/swagger";

export class PaginatedItemsDto<ItemDtoType> {
    @ApiProperty()
    page: number;

    @ApiProperty()
    pageCount: number;

    @ApiProperty()
    total: number;

    @ApiProperty()
    count: number;

    @ApiProperty()
    items: ItemDtoType[];
}