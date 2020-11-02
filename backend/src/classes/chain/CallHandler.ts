import { IOperationDelay } from '../../typescript/helpers/ICallDelay';

class AsyncOperationHandler<T> {
	private calls: IOperationDelay<T>[] = [];

	private currentTimer!: ReturnType<typeof setTimeout>;

	private cleared = true;

	public onFinish!: (handler: AsyncOperationHandler<T>) => void;

	public objs: T[] = [];

	public addCall(callDelay: IOperationDelay<T>): void {
		this.calls.push(callDelay);
	}

	public nextCall(): void {
		if (!this.cleared) return;

		const nextHandler = this.calls.shift();

		console.log(
			`Handling async process: remaining: ${this.calls.length}`
		);

		if (!nextHandler) {
			this.clear();

			return;
		}

		this.cleared = false;

		this.currentTimer = setTimeout(async () => {
			await nextHandler?.operation();

			this.objs.push(nextHandler.objectResult);

			clearTimeout(this.currentTimer);
			this.cleared = true;

			this.nextCall();
		}, nextHandler.delay);
	}

	private clear(): void {
		if (this.currentTimer) clearTimeout(this.currentTimer);

		this.calls.length = 0;

		if (this.onFinish != null) {
			setTimeout(() => {
				this.onFinish(this);
			}, 1000);
		}
	}
}

export default AsyncOperationHandler;
