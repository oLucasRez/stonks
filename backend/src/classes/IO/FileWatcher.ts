import fs from 'fs';

class FileWatcher {
	private static instances: any = Object();

	private path: string;

	public fileContent: string;

	private constructor(path: string) {
		this.path = path;
		this.fileContent = '';

		this.fileContent = this.LoadFile();
		this.watchProcess();
	}

	public static getInstance(path: string): FileWatcher {
		if (!FileWatcher.instances[path]) {
			FileWatcher.instances[path] = new FileWatcher(path);
		}

		return FileWatcher.instances[path];
	}

	private LoadFile(): string {
		const fileContent = fs.readFileSync(this.path, {
			encoding: 'utf-8',
		});

		return fileContent;
	}

	public appendFile(data: string): void {
		fs.appendFileSync(this.path, data);
	}

	private watchProcess(): void {
		fs.watch(this.path, { encoding: 'utf-8' }, (event) => {
			if (event === 'change') {
				this.fileContent = this.LoadFile();
			}
		});
	}
}

export default FileWatcher;
