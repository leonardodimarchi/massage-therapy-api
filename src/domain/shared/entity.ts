export interface BaseEntityProperties {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export abstract class Entity {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: BaseEntityProperties) {
        this.id = props.id;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}