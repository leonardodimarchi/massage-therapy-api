export interface EntityProps {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export abstract class Entity<TProps> {
    protected _id: number;
    protected _createdAt: Date;
    protected _updatedAt: Date;

    protected props: TProps;

    constructor(props: TProps, baseEntityProps: EntityProps = {}) {
        if (baseEntityProps.id)
            this._id = baseEntityProps.id;

        this._createdAt = baseEntityProps.createdAt ?? new Date();
        this._updatedAt = baseEntityProps.updatedAt ?? new Date();

        this.props = props;
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