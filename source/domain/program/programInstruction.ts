import { Instruction } from './instruction.enum';
import { Module } from '../modules/module';
import { MovementEngine } from '../movement/movement';

export class ProgramInstruction {
	constructor(public module: Module, public instruction: Instruction) {}

	execute(mover: MovementEngine) {
		this.module.execute(this.instruction, mover);
	}
}
