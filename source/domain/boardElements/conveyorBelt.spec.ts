import { filter } from 'lodash';

import { ConveyorBelt } from './conveyorBelt';
import { ConcreteBlock } from './concreteBlock';
import { BoardElementType } from './boardElementType.enum';
import { MapItemType } from '../map/mapItem/index';
import { Map } from '../map/map';
import { Robot } from '../robot/index';
import { Point, heading } from '../../utilities/angles/index';

describe('ConveyorBelt', () => {
	it('should filter by Conveyor belt using isConveyorBelt', () => {
		const belt = new ConveyorBelt();
		
		const boardElement1 = {
			type: MapItemType.boardElement
		};
		
		const boardElement2 = {
			type: MapItemType.boardElement
		};
		
		const map = new Map();
		map.items.push(belt);
		map.items.push(<any>boardElement1);
		map.items.push(<any>boardElement2);
		
		const belts = filter(map.getBoardElements(), element => element.elementType === BoardElementType.conveyorBelt);
		
		expect(belts).to.contain(belt);
		expect(belts).to.not.contain(boardElement1);
		expect(belts).to.not.contain(boardElement2);
	});
	
	it('should push the robot one space', () => {
		const belt = new ConveyorBelt();
		belt.coordinate = new Point(0, 0, 0);
		belt.heading = heading.south;
		
		const floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 2, y: 2, z: 0 };
		
		const robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;	//heading should be irrelevant, test should break if not
		
		const map = new Map();
		map.items.push(belt);
		map.items.push(floor);
		map.items.push(robot);
		
		belt.execute(robot, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(1);
		expect(robot.coordinate.z).to.equal(0);
	});
	
	it('should turn the robot if the conveyer belt turns', () => {
		const belt1 = new ConveyorBelt();
		belt1.coordinate = new Point(0, 0, 0);
		belt1.heading = heading.south;
		
		const belt2 = new ConveyorBelt();
		belt2.coordinate = new Point(0, 1, 0);
		belt2.heading = heading.east;
		
		const floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 2, y: 2, z: 0 };
		
		const robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		const map = new Map();
		map.items.push(belt1);
		map.items.push(belt2);
		map.items.push(floor);
		map.items.push(robot);
		
		belt1.execute(robot, map);
		
		expect(robot.heading.x).to.equal(heading.north.x);	//90 counterclockwise from east should be north
		expect(robot.heading.y).to.equal(heading.north.y);
		expect(robot.heading.z).to.equal(heading.north.z);
	});
});