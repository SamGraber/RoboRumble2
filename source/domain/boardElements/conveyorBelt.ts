import { first, filter } from 'lodash';

import { BoardElement } from './boardElement';
import { BoardElementType } from './boardElementType.enum';
import { BoardElementPriorities } from './boardElementPriorities.enum';
import { Point, heading } from '../../utilities/angles/index';
import { MovementEngine, Rotation } from '../movement/movement';
import { Robot } from '../robot/index';

export class ConveyorBelt extends BoardElement {
	elementType: BoardElementType = BoardElementType.conveyorBelt;
	heading: Point = heading.south;
	priority: BoardElementPriorities = BoardElementPriorities.normalBelts;

	constructor() {
		super();
		this.size = { x: 1, y: 1, z: 0 };
	}

	execute(robot: Robot, mover: MovementEngine): void {
		const currentCoordinate = robot.coordinate;

		if (robot.coordinate.equals(this.coordinate)) {
			mover.move(robot, this.heading);

			if (!currentCoordinate.equals(robot.coordinate))
			{
				const targetBelt = <ConveyorBelt>first(filter(mover.map.getBoardElements(), element => robot.coordinate.equals(element.coordinate) && element.elementType === BoardElementType.conveyorBelt));
				if (targetBelt && targetBelt.heading != this.heading)
				{
					this.turn(robot, targetBelt, mover);
				}
			}
		}
	}

	turn(robot: Robot, targetBelt: ConveyorBelt, mover: MovementEngine): void {
		if (targetBelt.heading.equals(heading.clockwise(this.heading)))
		{
			mover.turn(robot, Rotation.clockwise);
		}
		else if (targetBelt.heading.equals(heading.counterClockwise(this.heading)))
		{
			mover.turn(robot, Rotation.counterClockwise);
		}
	}
}