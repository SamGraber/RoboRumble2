import { Module } from '../module';
import { ModuleType } from '../moduleType.enum';
import { Instruction } from '../../program/instruction.enum';
import { MovementEngine, Rotation } from '../../movement/movement';

export class BasicWheels extends Module {
	slots: number = 4;
	type: ModuleType = ModuleType.drive;
	
	constructor(public robot) {
		super();
	}

	getInstructionList(): Instruction[] {
		return [
			Instruction.move1,
			Instruction.move2,
			Instruction.turnLeft,
			Instruction.turnRight,
			Instruction.uTurn,
		];
	}

	execute(action, mover: MovementEngine): void {
		if (action == Instruction.move1) {
			mover.move(this.robot);
		}
		else if (action == Instruction.move2) {
			mover.move(this.robot);
			mover.move(this.robot);
		}
		else if (action == Instruction.turnRight) {
			mover.turn(this.robot, Rotation.clockwise);
		}
		else if (action == Instruction.turnLeft) {
			mover.turn(this.robot, Rotation.counterClockwise);
		}
		else if (action == Instruction.uTurn) {
			mover.turn(this.robot, Rotation.clockwise);
			mover.turn(this.robot, Rotation.clockwise);
		}
	}
}
