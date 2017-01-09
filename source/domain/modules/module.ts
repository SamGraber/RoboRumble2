import { ModuleType } from './moduleType.enum';

export abstract class Module {
	exhausted: boolean = false;
	abstract type: ModuleType;

	refresh(): void {
		this.exhausted = false;
	}
}
