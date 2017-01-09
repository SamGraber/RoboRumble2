import { map, max, union, sortBy, reverse, each, flatten } from 'lodash';

import { MapItem, MapItemType, Permeability } from '../map/mapItem/index';
import { Chassis } from './chassis';
import { Point, Size, heading } from '../../utilities/angles/index';
import { Instruction } from '../program/index';
import { CPU } from '../modules/index';

export class Robot extends MapItem {
	type: MapItemType = MapItemType.robot;
	permeability: Permeability = Permeability.moveable;
	heading: Point = heading.south;
	chassis: Chassis;
	mods = [];
	priorities = [];

	constructor() {
		super();
		this.size = { x: 1, y: 1, z: 1 };
	}

	getAllInstructions(): Instruction[] {
		const cpus = this.chassis.getCPUs();
		const instructionLists = map(cpus, cpu => this.getInstructionList(cpu));
		return union(flatten(instructionLists));
	}

	getInstructionList(cpu: CPU): Instruction[] {
		// Get the instruction lists from modules
		const instructionLists = map(this.chassis.modules, function(module) {
			const complexityLevel = cpu.getComplexityLevel(module.type);
			return module.getInstructionList(complexityLevel);
		});
		
		// Flatten the instruction lists and get only unique instructions
		return union(flatten(instructionLists));
	}

	executePhase(phase: number, map) {
		const cpus: CPU[] = reverse(sortBy(this.chassis.getCPUs(), cpu => cpu.cpuPriority));

		each(cpus, cpu => cpu.executeInstruction(phase, map));
	
		// each(this.chassis.modules, function(module) { module.refresh(); });
	}
}
