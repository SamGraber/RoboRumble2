import { BasicWheels } from './basicWheels';
import { ConcreteBlock } from '../../boardElements/concreteBlock';
import { Robot } from '../../robot/index';
import { Instruction } from '../../program/index';
import { Map } from '../../map/map';
import { Point, heading } from '../../../utilities/angles/index';

describe('BasicWheels', () => {
	it('should move one space', () => {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 2, y: 2, z: 0 };
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.south;
		
		var drive = new BasicWheels(robot);
		
		robot.chassis = <any>{
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(Instruction.move1, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(1);
		expect(robot.coordinate.z).to.equal(0);
	});
	
	it('should move two spaces', () => {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 3, y: 3, z: 0 };
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.south;
		
		var drive = new BasicWheels(robot);
		
		robot.chassis = <any>{
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(Instruction.move2, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(2);
		expect(robot.coordinate.z).to.equal(0);
	});
	
	it('should rotate right', () => {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 2, y: 2, z: 0 };
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		var drive = new BasicWheels(robot);
		
		robot.chassis = <any>{
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(Instruction.turnRight, map);
		
		expect(robot.heading).to.equal(heading.south);
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(0);
	});
	
	it('should rotate left', () => {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 2, y: 2, z: 0};
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.west;
		
		var drive = new BasicWheels(robot);
		
		robot.chassis = <any>{
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(Instruction.turnLeft, map);
		
		expect(robot.heading).to.equal(heading.south);
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(0);
	});
	
	it('should rotate 180 degrees', () => {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 2, y: 2, z: 0 };
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.north;
		
		var drive = new BasicWheels(robot);
		
		robot.chassis = <any>{
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(Instruction.uTurn, map);
		
		expect(robot.heading).to.equal(heading.south);
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(0);
	});
});