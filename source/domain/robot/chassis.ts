import { Module, ModuleType, CPU } from '../modules/index';
import { filter } from 'lodash';

export class Chassis {
	modules: Module[] = [];
	slots: number;

	getCPUs(): CPU[] {
		return <any[]>filter(this.modules, module => module.type == ModuleType.cpu);
	}
}