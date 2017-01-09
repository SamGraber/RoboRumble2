import { Module } from '../module';
import { ModuleType } from '../moduleType.enum';
import { Complexity } from '../complexity.enum';
import { Instruction, IInstruction } from '../../program/instruction.enum';
import { heading } from '../../../utilities/angles/heading';

export class BasicWheels extends Module {
	slots: number = 4;
	type: ModuleType = ModuleType.drive;
	
	constructor(public robot) {
		super();
	}

	getInstructionList(complexityLevel: Complexity): IInstruction[] {
		let instructions = [
			Instruction.move2,
			Instruction.turnLeft,
			Instruction.turnRight,
		];

		if (complexityLevel >= Complexity.moderate) {
			instructions.push(Instruction.move3);
		}

		return instructions;
	}

	execute(action, map): void {
		if (action == Instruction.move2) {
		map.move(this.robot, this.robot.heading);
		map.move(this.robot, this.robot.heading);
	}
	else if (action == Instruction.move3) {
		map.move(this.robot, this.robot.heading);
		map.move(this.robot, this.robot.heading);
		map.move(this.robot, this.robot.heading);
	}
	else if (action == Instruction.turnRight) {
		this.robot.heading = heading.clockwise(this.robot.heading);
	}
	else if (action == Instruction.turnLeft) {
		this.robot.heading = heading.counterClockwise(this.robot.heading);
	}
	}
}
