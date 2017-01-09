import { SpeedyWheels } from './speedyWheels';
import { ConcreteBlock } from '../../boardElements/concreteBlock';
import { Robot } from '../../robot/index';
import { Instruction } from '../../program/index';
import { Complexity } from '../../modules/index';
import { Map } from '../../map/map';
import { Point, heading } from '../../../utilities/angles/index';

describe('SpeedyWheels', () => {
	it('should provide a known list of move instructions with simple complexity', () => {
		const module = new SpeedyWheels(<any>{});
		
		const availableInstructions = module.getInstructionList(Complexity.simple);
		expect(availableInstructions).to.have.length(3);
		expect(availableInstructions).to.contain(Instruction.turnLeft);
		expect(availableInstructions).to.contain(Instruction.turnRight);
		expect(availableInstructions).to.contain(Instruction.move2);
	});

	it('should provide a known list of move instructions with moderate complexity', () => {
		const module = new SpeedyWheels(<any>{});
		
		const availableInstructions = module.getInstructionList(Complexity.moderate);
		expect(availableInstructions).to.have.length(4);
		expect(availableInstructions).to.contain(Instruction.turnLeft);
		expect(availableInstructions).to.contain(Instruction.turnRight);
		expect(availableInstructions).to.contain(Instruction.move2);
		expect(availableInstructions).to.contain(Instruction.move3);
	});
	
	it('should move two spaces', () => {
		const floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 3, y: 3, z: 0 };
		
		const robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.south;
		
		const drive = new SpeedyWheels(robot);
		
		robot.chassis = <any>{
			modules: [ drive ],
		};
		
		const map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(Instruction.move2, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(2);
		expect(robot.coordinate.z).to.equal(0);
	});
	
	it('should move three spaces', () => {
		const floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 4, y: 4, z: 0 };
		
		const robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.south;
		
		const drive = new SpeedyWheels(robot);
		
		robot.chassis = <any>{
			modules: [ drive ],
		};
		
		const map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(Instruction.move3, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(3);
		expect(robot.coordinate.z).to.equal(0);
	});
	
	it('should rotate right', () => {
		const floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 2, y: 2, z: 0 };
		
		const robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		const drive = new SpeedyWheels(robot);
		
		robot.chassis = <any>{
			modules: [ drive ],
		};
		
		const map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(Instruction.turnRight, map);
		
		expect(robot.heading).to.equal(heading.south);
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(0);
	});
	
	it('should rotate left', () => {
		const floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = { x: 2, y: 2, z: 0 };
		
		const robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.west;
		
		const drive = new SpeedyWheels(robot);
		
		robot.chassis = <any>{
			modules: [ drive ],
		};
		
		const map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(Instruction.turnLeft, map);
		
		expect(robot.heading).to.equal(heading.south);
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(0);
	});
});