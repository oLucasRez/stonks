import CallDelay from './CallDelay';

class CallHandler<T> {
	private calls: CallDelay<T>[] = new Array(0);

	private currentTimer!: ReturnType<typeof setTimeout>;

	private cleared = true;

	public onFinish!: (handler: CallHandler<T>) => void;

	public objs: T[] = new Array(0);

	public addCall(callDelay: CallDelay<T>): void {
		this.calls.push(callDelay);
	}

	public nextCall(): void {
		if (!this.cleared) return;

		const nextHandler = this.calls.shift();

		if (!nextHandler) {
			this.clear();
			return;
		}

		this.cleared = false;
		this.currentTimer = setTimeout(async () => {
			await nextHandler?.call();

			this.objs.push(nextHandler.obj);

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

export default CallHandler;
