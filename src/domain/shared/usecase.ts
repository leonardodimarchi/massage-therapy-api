abstract class UseCase<Output, Input> {
    abstract call(params: Input): Promise<Output> | Output;
}