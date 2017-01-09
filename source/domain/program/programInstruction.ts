import { Instruction } from './instruction.enum';
import { Module } from '../modules/module';

export class ProgramInstruction {
	constructor(public module: Module, public instruction: Instruction) {}

	execute(map) {
		this.module.execute(this.instruction, map);
	}
}
