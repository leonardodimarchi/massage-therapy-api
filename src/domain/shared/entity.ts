export interface EntityProps {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export abstract class Entity {
    private _id: number;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: EntityProps = {}) {
        if (props.id)
            this._id = props.id;

        this._createdAt = props.createdAt ?? new Date();
        this._updatedAt = props.updatedAt ?? new Date();
    }

    public get id(): number {
        return this._id;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }
}