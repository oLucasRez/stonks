abstract class Service<T> {
	protected api!: T;

	protected static instance: unknown;

	public abstract getAPI(): T | Promise<T>;

	static getInstance(): unknown {
		return undefined;
	}
}

export default Service;
