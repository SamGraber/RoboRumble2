import { first, filter } from 'lodash';

import { BoardElement } from './boardElement';
import { BoardElementType } from './boardElementType.enum';
import { Point, heading } from '../../utilities/angles/index';
import { Map } from '../map/map';
import { Robot } from '../robot/index';

export class ConveyorBelt extends BoardElement {
	elementType: BoardElementType = BoardElementType.conveyorBelt;
	heading: Point = heading.south;
	priority = { 6: true };

	constructor() {
		super();
		this.size = { x: 1, y: 1, z: 0 };
	}

	execute(robot: Robot, map: Map): void {
		const currentCoordinate = robot.coordinate;

		if (robot.coordinate.equals(this.coordinate)) {
			map.move(robot, this.heading);

			if (!currentCoordinate.equals(robot.coordinate))
			{
				const targetBelt = <ConveyorBelt>first(filter(map.getBoardElements(), element => robot.coordinate.equals(element.coordinate) && element.elementType === BoardElementType.conveyorBelt));
				if (targetBelt && targetBelt.heading != this.heading)
				{
					this.turn(robot, targetBelt);
				}
			}
		}
	}

	turn(robot: Robot, targetBelt: ConveyorBelt): void {
		if (targetBelt.heading.equals(heading.clockwise(this.heading)))
		{
			robot.heading = heading.clockwise(robot.heading);
		}
		else if (targetBelt.heading.equals(heading.counterClockwise(this.heading)))
		{
			robot.heading = heading.counterClockwise(robot.heading);
		}
	}
}