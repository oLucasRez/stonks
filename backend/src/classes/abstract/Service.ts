abstract class Service<T> {
	protected instance: any;

	protected api!: T;

	protected static instance: any;

	public abstract getAPI(): T | Promise<T>;

	static getInstance(): any {}
}

export default Service;
