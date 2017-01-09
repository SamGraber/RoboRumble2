import { filter, each, remove } from 'lodash';

import { MapItem, MapItemType, Permeability } from './mapItem/index';
import { BoardElement } from '../boardElements/boardElement';
import { Robot } from '../robot/index';
import { Point, Ray, heading } from '../../utilities/angles/index';

export class Map {
	game;
	items: MapItem[] = [];
	bottom: number = -5;

	getRobots(): Robot[] {
		return <any[]>filter(this.items, item => item.type == MapItemType.robot);
	}

	getNPCs(): MapItem[] {
		return filter(this.items, item => item.type == MapItemType.npc);
	}

	getBoardElements(): BoardElement[] {
		return <any[]>filter(this.items, item => item.type == MapItemType.boardElement);
	}

	move(movingItem: MapItem, direction: Point, pushed?: boolean): boolean {
		const map = this;
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
		
		function checkForCollision(item: MapItem, ray: Ray) {
			let stop;
			if (item === movingItem) {
				//item can't collide with itself
				return;
			}
			
			if (map.intersect(ray, item)) {
				if (item.permeability === Permeability.nonpermeable) {
					stop = true;
				}
				else if (item.permeability === Permeability.moveable) {
					//only one item can be pushed. If the moving item was pushed, moveable collisions are treated the same as nonpermeable
					if (!pushed) {
						if (map.move(item, direction, true) === false) {
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

	intersect(ray: Ray, cube: MapItem): boolean {
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