interface CallDelay<T> {
	call: () => void;

	delay: number;

	obj: T;
}

export default CallDelay;
