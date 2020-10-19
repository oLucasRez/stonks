import { resolve } from 'path';

import FileWatcher from '../IO/FileWatcher';

abstract class IGDBCall {
	private logWatcher: FileWatcher;

	private fetchedIds!: string[];

	constructor() {
		const resolvedPath = resolve(
			__dirname,
			'../../log/fetched_ids.log'
		);

		this.logWatcher = FileWatcher.getInstance(resolvedPath);
	}

	abstract requestPrototype(): string;

	public call(): void {
		this.fetchedIds = this.loadFetchedIds();

		const newIds = this.request();

		this.saveNewFetchedIds(newIds);
	}

	private loadFetchedIds(): string[] {
		const { fileContent } = this.logWatcher;

		const ids = fileContent.split('\r\n');

		return ids;
	}

	private request(): string[] {
		// Prepare request with id removal

		// TODO

		// eslint-disable-next-line no-unused-vars
		const requestBody = this.requestPrototype();

		throw new Error('Not Implemented');
	}

	private saveNewFetchedIds(newIds: string[]): void {
		let ids = '';

		for (let i = 0; i < newIds.length; i += 1) {
			let currentId = newIds[i];

			if (i !== newIds.length - 1) {
				currentId = `${currentId}\r\n`;
			}

			ids = `${ids}\r\n`;
		}

		this.logWatcher.appendFile(ids);
	}
}

export default IGDBCall;
