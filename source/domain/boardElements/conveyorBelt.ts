

import { MapItem, MapItemType } from '../map/mapItem/index';
import { Point, Size, heading } from '../../utilities/angles/index';
import { Robot } from '../robot/index';

export class ConveyorBelt extends MapItem {
	type: MapItemType = MapItemType.boardElement;
	isConveyorBelt: boolean = true;
	heading: Point = heading.south;
	priority = { 6: true };

	constructor() {
		super();
		this.size = { x: 1, y: 1, z: 0 };
	}

	// execute(robot: Robot, map): void {
	// 	const currentCoordinate = robot.coordinate;

	// 	if (robot.coordinate.equals(this.coordinate)) {
	// 		map.move(robot, this.heading);

	// 		if (!currentCoordinate.equals(robot.coordinate)) {

	// 		}
	// 	}
	// }
}