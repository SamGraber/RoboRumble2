import { Point } from './point';

export const heading = {
	north: new Point(0, -1, 0),
	south: new Point(0, 1, 0),
	east: new Point(1, 0, 0),
	west: new Point(-1, 0, 0),
	up: new Point(0, 0, 1),
	down: new Point(0, 0, -1),
	clockwise: clockwise,
	counterClockwise: counterClockwise,
};

function clockwise(point: Point): Point {
	if (point.equals(heading.north)) {
		return heading.east;
	} 
	else if (point.equals(heading.south)) {
		return heading.west;
	}
	else if (point.equals(heading.east)) {
		return heading.south;
	}
	else if (point.equals(heading.west)) {
		return heading.north;
	}
}

function counterClockwise(point: Point): Point {
	if (point.equals(heading.north)) {
		return heading.west;
	}
	else if (point.equals(heading.south)) {
		return heading.east;
	}
	else if (point.equals(heading.east)) {
		return heading.north;
	}
	else if (point.equals(heading.west)) {
		return heading.south;
	}
}