import { Module } from '../module';
import { ModuleType } from '../moduleType.enum';
import { Complexity } from '../complexity.enum';
import { CPU } from '../cpu';
import { Map } from '../../map/map';

export class BasicProcessor extends Module implements CPU {
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

	executeInstruction(phase: number, map: Map): void {
		this.instructions[phase].execute(map);
	}
}