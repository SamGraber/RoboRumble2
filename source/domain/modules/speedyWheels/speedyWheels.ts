import { Module } from '../module';
import { ModuleType } from '../moduleType.enum';
import { Complexity } from '../complexity.enum';
import { Instruction } from '../../program/instruction.enum';
import { MovementEngine, Rotation } from '../../movement/movement';

export class SpeedyWheels extends Module {
	slots: number = 4;
	type: ModuleType = ModuleType.drive;
	
	constructor(public robot) {
		super();
	}

	getInstructionList(complexityLevel: Complexity): Instruction[] {
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

	execute(action, mover: MovementEngine): void {
		if (action == Instruction.move2) {
			mover.move(this.robot);
			mover.move(this.robot);
		}
		else if (action == Instruction.move3) {
			mover.move(this.robot);
			mover.move(this.robot);
			mover.move(this.robot);
		}
		else if (action == Instruction.turnRight) {
			mover.turn(this.robot, Rotation.clockwise);
		}
		else if (action == Instruction.turnLeft) {
			mover.turn(this.robot, Rotation.counterClockwise);
		}
	}
}
