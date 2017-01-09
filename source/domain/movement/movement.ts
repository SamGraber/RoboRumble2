import { each, remove } from 'lodash';

import { Map } from '../map/map';
import { IMapItem, IMoveableMapItem, Permeability } from '../map/mapItem/index';
import { Point, Ray, heading } from '../../utilities/angles/index';

export enum Rotation {
	clockwise = 0,
	counterClockwise = 1,
};

// provides an abstraction layer for declaring movement actions
export class MovementEngine {
	constructor(public map: Map) {}

	move(item: IMoveableMapItem, heading?: Point): void {
		this.executeMove(item, heading || item.heading);
	}

	turn(item: IMoveableMapItem, rotation: Rotation): void {
		if (rotation === Rotation.clockwise) {
			item.heading = heading.clockwise(item.heading);
		} else if (rotation === Rotation.counterClockwise) {
			item.heading = heading.counterClockwise(item.heading);
		}
	}

	executeMove(movingItem: IMapItem, direction: Point, pushed?: boolean): boolean {
		const map = this.map;
		const movementEngine = this;
		let stop;
		
		//add (0.5, 0.5, 0.5) to the coordinate of the moving item to measure from the center of the space
		const origin = movingItem.coordinate.add(new Point(0.5, 0.5, 0.5));
		const movementRay = new Ray(origin.toVector(direction));
		
		//apply some filter to the map items
		each(map.items, item => {
			if (checkForCollision(item, movementRay)) {
				stop = true;
			}
		});
		
		if (!stop) {
			movingItem.coordinate = movingItem.coordinate.add(direction);
		}

		gravity();
		return !stop;
		
		function checkForCollision(item: IMapItem, ray: Ray) {
			let stop;
			if (item === movingItem) {
				//item can't collide with itself
				return;
			}
			
			if (movementEngine.intersect(ray, item)) {
				if (item.permeability === Permeability.nonpermeable) {
					stop = true;
				}
				else if (item.permeability === Permeability.moveable) {
					//only one item can be pushed. If the moving item was pushed, moveable collisions are treated the same as nonpermeable
					if (!pushed) {
						if (movementEngine.executeMove(item, direction, true) === false) {
							stop = true;
						}
					}
					else {
						stop = true;
					}
				}
				//call interaction functions
			}
			return stop;
		}
		
		function gravity() {
			let stop = false;
			
			//add (0.5, 0.5, 0.5) to the coordinate of the moving item to measure from the center of the space
			const origin = movingItem.coordinate.add(new Point(0.5, 0.5, 0.5));
			const movementRay = new Ray(origin.toVector(heading.down));
			
			//apply some filter to the map items
			each(map.items, item => {
				if (checkForCollision(item, movementRay)) {
					stop = true;
				}
			});

			if (!stop) {
				movingItem.coordinate = movingItem.coordinate.add(heading.down);
				if (movingItem.coordinate.z < map.bottom) {
					//item falls off the map
					remove(map.items, movingItem);
					return;
				}
				gravity();
			}
		}
	}

	intersect(ray: Ray, cube: IMapItem): boolean {
		const bounds = [ 
			cube.coordinate, 
			new Point(cube.coordinate.x + cube.size.x, 
			cube.coordinate.y + cube.size.y, 
			cube.coordinate.z + cube.size.z), 
		];

		let minTimeToIntersect, maxTimeToIntersect, minTimeToYIntersect, maxTimeToYIntersect, minTimeToZIntersect, maxTimeToZIntersect;
		minTimeToIntersect = (bounds[ray.sign[0]].x - ray.origin.x) * ray.inverseOffset.x;
		maxTimeToIntersect = (bounds[1 - ray.sign[0]].x - ray.origin.x) * ray.inverseOffset.x;
		minTimeToYIntersect = (bounds[ray.sign[1]].y - ray.origin.y) * ray.inverseOffset.y;
		maxTimeToYIntersect = (bounds[1 - ray.sign[1]].y - ray.origin.y) * ray.inverseOffset.y;
		
		if ((minTimeToIntersect > maxTimeToYIntersect) || (minTimeToYIntersect > maxTimeToIntersect)) {
			return false;
		}
		if (minTimeToYIntersect > minTimeToIntersect) {
			minTimeToIntersect = minTimeToYIntersect;
		}
		if (maxTimeToYIntersect < maxTimeToIntersect) {
			maxTimeToIntersect = maxTimeToYIntersect;
		}

		minTimeToZIntersect = (bounds[ray.sign[2]].z - ray.origin.z) * ray.inverseOffset.z;
		maxTimeToZIntersect = (bounds[1 - ray.sign[2]].z - ray.origin.z) * ray.inverseOffset.z;

		if ((minTimeToIntersect > maxTimeToZIntersect) || (minTimeToZIntersect > maxTimeToIntersect)) {
			return false;
		}
		if (minTimeToZIntersect > minTimeToIntersect) {
			minTimeToIntersect = minTimeToZIntersect;
		}
		if (maxTimeToZIntersect < maxTimeToIntersect) {
			maxTimeToIntersect = maxTimeToZIntersect;
		}
		
		//a value of < 0 or > 1 indicates that the collision happens outside of the length of the Ray
		if ((minTimeToIntersect > 0 && minTimeToIntersect < 1) || (maxTimeToIntersect > 0 && maxTimeToIntersect < 1)) {
			return true;
		}
		else {
			return false;
		}
	}
}