import { Instruction } from './instruction.enum';
import { Module } from '../modules/module';
import { Map } from '../map/map';

export class ProgramInstruction {
	constructor(public module: Module, public instruction: Instruction) {}

	execute(map: Map) {
		this.module.execute(this.instruction, map);
	}
}
