import { Point } from './point';

export class Vector {
	origin: Point;
	offset: Point;

	destination(): Point {
		return this.origin.add(this.offset);
	}
}