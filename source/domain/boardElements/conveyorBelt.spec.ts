import { filter } from 'lodash';

import { ConveyorBelt } from './conveyorBelt';
import { ConcreteBlock } from './concreteBlock';
import { BoardElementType } from './boardElementType.enum';
import { MapItemType } from '../map/mapItem/index';
import { Map } from '../map/map';
import { Rotation } from '../movement/movement';
import { Robot } from '../robot/index';
import { Point, heading } from '../../utilities/angles/index';

interface IMover {
	move: Sinon.SinonSpy;
	turn: Sinon.SinonSpy;
	map: any;
}

describe('ConveyorBelt', () => {
	let mover: IMover;

	beforeEach(() => {
		mover = {
			move: sinon.spy(),
			turn: sinon.spy(),
		};
	});

	it('should filter by Conveyor belt using the board element type', () => {
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
		
		const robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;	//heading should be irrelevant, test should break if not
		
		belt.execute(robot, <any>mover);
		
		sinon.assert.calledOnce(mover.move);
	});
	
	it('should turn the robot if the conveyer belt turns', () => {
		const belt1 = new ConveyorBelt();
		belt1.coordinate = new Point(0, 0, 0);
		belt1.heading = heading.south;
		
		const belt2 = new ConveyorBelt();
		belt2.coordinate = new Point(0, 1, 0);
		belt2.heading = heading.east;
		
		const robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		mover.move = sinon.spy(() => robot.coordinate = robot.coordinate.add(belt1.heading));
		mover.map = {
			getBoardElements: () => [belt1, belt2],
		};
		
		belt1.execute(robot, <any>mover);
		
		sinon.assert.calledOnce(mover.move);
		sinon.assert.calledOnce(mover.turn);
		sinon.assert.calledWith(mover.turn, robot, Rotation.counterClockwise);
	});
});