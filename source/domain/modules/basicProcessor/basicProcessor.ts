import { Module } from '../module';
import { ModuleType } from '../moduleType.enum';
import { Complexity } from '../complexity.enum';

export class BasicProcessor extends Module {
	slots: number = 2;
	instructions: any = {};
	cpuPriority = 0;
	type: ModuleType = ModuleType.cpu;

	constructor(public robot) {
		super();
	}

	getComplexityLevel(type: ModuleType): Complexity {
		if (type == ModuleType.drive) {
			return Complexity.moderate;
		} else {
			return Complexity.simple;
		}
	}

	executeInstruction(phase: number, map): void {
		this.instructions[phase].execute(map);
	}
}