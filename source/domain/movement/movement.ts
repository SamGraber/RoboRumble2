import { Map } from '../map/map';
import { IMoveableMapItem } from '../map/mapItem/index';
import { heading } from '../../utilities/angles/index';

export enum Rotation {
	clockwise = 0,
	counterClockwise = 1,
};

// provides an abstraction layer for declaring movement actions
export class MovementEngine {
	constructor(public map: Map) {}

	move(item: IMoveableMapItem): void {
		this.map.move(item, item.heading);
	}

	turn(item: IMoveableMapItem, rotation: Rotation): void {
		if (rotation === Rotation.clockwise) {
			item.heading = heading.clockwise(item.heading);
		} else if (rotation === Rotation.counterClockwise) {
			item.heading = heading.counterClockwise(item.heading);
		}
	}
}