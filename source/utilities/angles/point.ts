import { Vector } from './vector';

export class Point {
	constructor (public x: number, public y: number, public z: number) {}

	toVector(relativePoint: Point): Vector {
		let vector = new Vector();
		vector.origin = this;
		vector.offset = relativePoint;
		return vector;
	}

	add(relativePoint: Point): Point {
		return new Point(this.x + relativePoint.x
						, this.y + relativePoint.y
						, this.z + relativePoint.z);
	}

	equals(point: Point): boolean {
		return (this.x == point.x
			&& this.y == point.y
			&& this.z == point.z);
	}

	inverse(): Point {
		return new Point(this.invert(this.x), this.invert(this.y), this.invert(this.z));
	}

	private invert(num: number): number {
		if (num !== 0) {
			return 1 / num;
		} else {
			return Number.POSITIVE_INFINITY;
		}
	}
}
