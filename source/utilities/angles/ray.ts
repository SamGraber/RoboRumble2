import { Point } from './point';
import { Vector } from './vector';

export class Ray {
	origin: Point;
	offset: Point;
	inverseOffset: Point;
	sign: number[];
	
	constructor(public vector: Vector) {
		this.origin = vector.origin;
		this.offset = vector.offset;
		this.inverseOffset = vector.offset.inverse();
		// 0 is positive, 1 is negative
		this.sign = [
			this.toSign(this.inverseOffset.x),
			this.toSign(this.inverseOffset.y),
			this.toSign(this.inverseOffset.z),
		];
	}

	private toSign(inverseOffset: number): number {
		return inverseOffset < 0 ? 1 : 0;
	}
}