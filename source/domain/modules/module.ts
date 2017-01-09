import { ModuleType } from './moduleType.enum';
import { Complexity } from './complexity.enum';
import { Instruction } from '../program/instruction.enum';
import { Map } from '../map/map';

export interface IModule {
	exhausted: boolean;
	type: ModuleType;
	
	execute(instruction, map: Map): void;
	getInstructionList(complexityLevel: Complexity): Instruction[];
	refresh(): void;
}

export abstract class Module {
	exhausted: boolean = false;
	abstract type: ModuleType;

	execute(instruction, map: Map): void {
		throw new Error('Not implemented');
	}

	getInstructionList(complexityLevel: Complexity): Instruction[] {
		throw new Error('Not implemented');
	}

	refresh(): void {
		this.exhausted = false;
	}
}
