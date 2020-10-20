abstract class Service<T> {
	protected instance: any;

	protected api!: T;

	protected static instance: any;

	public abstract getAPI(): T | Promise<T>;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	static getInstance(): any {}
}

export default Service;
