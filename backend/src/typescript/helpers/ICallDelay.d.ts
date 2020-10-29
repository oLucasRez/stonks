export declare interface IOperationDelay<T> {
	operation: () => Promise<void>;

	delay: number;

	objectResult: T;
}
