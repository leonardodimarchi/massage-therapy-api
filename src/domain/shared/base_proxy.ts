export interface BaseProxyProperties {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export class BaseProxy {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(props: BaseProxyProperties) {
        this.id = props.id;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}