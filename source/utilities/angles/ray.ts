import { Point } from './point';
import { Vector } from './vector';

export class Ray {
	origin: Point;
	offset: Point;
	inverseOffset: Point;
	sign: boolean[];
	
	constructor(public vector: Vector) {
		this.origin = vector.origin;
		this.offset = vector.offset;
		this.inverseOffset = vector.offset.inverse();
		this.sign = [
			this.inverseOffset.x < 0, 
			this.inverseOffset.y < 0, 
			this.inverseOffset.z < 0,
		];
	}
}