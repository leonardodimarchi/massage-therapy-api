import { ApiProperty } from "@nestjs/swagger";

export class PaginatedItemsViewModel<ItemDtoType> {
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