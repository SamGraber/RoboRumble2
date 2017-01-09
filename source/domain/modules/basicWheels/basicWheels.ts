import { Module } from '../module';
import { ModuleType } from '../moduleType.enum';
import { Instruction } from '../../program/instruction.enum';
import { heading } from '../../../utilities/angles/index';
import { Map } from '../../map/map';

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

	execute(action, map: Map): void {
		if (action == Instruction.move1) {
			map.move(this.robot, this.robot.heading);
		}
		else if (action == Instruction.move2) {
			map.move(this.robot, this.robot.heading);
			map.move(this.robot, this.robot.heading);
		}
		else if (action == Instruction.turnRight) {
			this.robot.heading = heading.clockwise(this.robot.heading);
		}
		else if (action == Instruction.turnLeft) {
			this.robot.heading = heading.counterClockwise(this.robot.heading);
		}
		else if (action == Instruction.uTurn) {
			this.robot.heading = heading.clockwise(this.robot.heading);
			this.robot.heading = heading.clockwise(this.robot.heading);
		}
	}
}
