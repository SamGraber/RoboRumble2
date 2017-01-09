import { MovementEngine, Rotation } from './movement';
import { ConcreteBlock } from '../boardElements/concreteBlock';
import { Point, Vector, Ray, heading } from '../../utilities/angles/index';
import { Robot } from '../robot/index';
import { Map } from '../map/map';

interface MapMock {
	move: Sinon.SinonSpy;
}

describe('MovementEngine', () => {
	describe('abstraction layer', () => {
		let movementEngine: MovementEngine;

		beforeEach(() => {
			movementEngine = new MovementEngine(<any>{});
		});

		it('should tell the map to move the item', () => {
			const item = { heading: '123' };
			const moveSpy = sinon.spy();
			movementEngine.executeMove = moveSpy;

			movementEngine.move(<any>item);

			sinon.assert.calledOnce(moveSpy);
			sinon.assert.calledWith(moveSpy, item, item.heading);
		});

		it('should change the heading to the next clockwise orientation', () => {
			const item = { heading: heading.north };

			movementEngine.turn(<any>item, Rotation.clockwise);

			expect(item.heading.equals(heading.east)).to.be.true;
		});

		it('should change the heading to the next counter-clockwise orientation', () => {
			const item = { heading: heading.north };

			movementEngine.turn(<any>item, Rotation.counterClockwise);

			expect(item.heading.equals(heading.west)).to.be.true;
		});
	});

	describe('implementation layer', () => {
		it('should collide with wall', () => {
			const floor = new ConcreteBlock();
			floor.coordinate = new Point(0, 0, 0);
			floor.size = { x: 2, y: 2, z: 0 };
			
			const wall = new ConcreteBlock();
			wall.coordinate = new Point(1, 0, 0);
			wall.size = { x: 0, y: 1, z: 1 };
			
			const robot = new Robot();
			robot.coordinate = new Point(0, 0, 0);
			robot.heading = heading.east;
			
			const map = new Map();
			map.items.push(floor);
			map.items.push(wall);
			map.items.push(robot);
			
			map.movementEngine.executeMove(robot, robot.heading);
			
			expect(robot.coordinate.x).to.equal(0);
			expect(robot.coordinate.y).to.equal(0);
			expect(robot.coordinate.z).to.equal(0);
		});
		
		it('should push a robot', () => {
			const floor = new ConcreteBlock();
			floor.coordinate = new Point(0, 0, 0);
			floor.size = { x: 3, y: 3, z: 0 };
			
			const robot = new Robot();
			robot.coordinate = new Point(0, 0, 0);
			robot.heading = heading.east;
			
			const otherRobot = new Robot();
			otherRobot.coordinate = new Point(1, 0, 0);
			otherRobot.heading = heading.south; //heading should be irrelevant when being pushed
			
			const map = new Map();
			map.items.push(floor);
			map.items.push(robot);
			map.items.push(otherRobot);
			
			map.movementEngine.executeMove(robot, robot.heading);
			
			expect(robot.coordinate.x).to.equal(1);
			expect(robot.coordinate.y).to.equal(0);
			expect(robot.coordinate.z).to.equal(0);
			expect(otherRobot.coordinate.x).to.equal(2);
			expect(otherRobot.coordinate.y).to.equal(0);
			expect(otherRobot.coordinate.z).to.equal(0);
		});
		
		it('should not push two robots', () => {
			const floor = new ConcreteBlock();
			floor.coordinate = new Point(0, 0, 0);
			floor.size = { x: 4, y: 4, z: 0 };
			
			const robot = new Robot();
			robot.coordinate = new Point(0, 0, 0);
			robot.heading = heading.east;
			
			const robot2 = new Robot();
			robot2.coordinate = new Point(1, 0, 0);
			robot2.heading = heading.south; //heading should be irrelevant when being pushed
			
			const robot3 = new Robot();
			robot3.coordinate = new Point(2, 0, 0);
			robot3.heading = heading.north; //heading should be irrelevant when being pushed
			
			const map = new Map();
			map.items.push(floor);
			map.items.push(robot);
			map.items.push(robot2);
			map.items.push(robot3);
			
			const move = map.movementEngine.executeMove(robot, robot.heading);
			
			expect(move).to.equal(false);
			expect(robot.coordinate.x).to.equal(0);
			expect(robot.coordinate.y).to.equal(0);
			expect(robot.coordinate.z).to.equal(0);
			expect(robot2.coordinate.x).to.equal(1);
			expect(robot2.coordinate.y).to.equal(0);
			expect(robot2.coordinate.z).to.equal(0);
			expect(robot3.coordinate.x).to.equal(2);
			expect(robot3.coordinate.y).to.equal(0);
			expect(robot3.coordinate.z).to.equal(0);
		});
		
		it('should fall off the edge of the map', () => {
			const floor = new ConcreteBlock();
			floor.coordinate = new Point(0, 0, 0);
			floor.size = { x: 1, y: 1, z: 0 };
			
			const robot = new Robot();
			robot.coordinate = new Point(0, 0, 0);
			robot.heading = heading.east;
			
			const map = new Map();
			map.items.push(floor);
			map.items.push(robot);
			
			map.movementEngine.executeMove(robot, robot.heading);
			
			expect(map.items).to.not.contain(robot);
		});
		
		it('should fall to a lower level', () => {
			const floor = new ConcreteBlock();
			floor.coordinate = new Point(0, 0, 0);
			floor.size = { x: 2, y: 2, z: 0 };
			
			const platform = new ConcreteBlock();
			platform.coordinate = new Point(0, 0, 0);
			platform.size = { x: 1, y: 1, z: 1 };
			
			const robot = new Robot();
			robot.coordinate = new Point(0, 0, 1); // on top of the platform
			robot.heading = heading.east;
			
			const map = new Map();
			map.items.push(floor);
			map.items.push(platform);
			map.items.push(robot);
			
			map.movementEngine.executeMove(robot, robot.heading);
			
			expect(robot.coordinate.x).to.equal(1);
			expect(robot.coordinate.y).to.equal(0);
			expect(robot.coordinate.z).to.equal(0);
		});
		
		it('should not intersect with cube below', () => {
			const vector = new Vector();
			vector.origin = new Point(0.5, 0.5, 0.5);
			vector.offset = new Point(1.5, 0.5, 0.5);
			const ray = new Ray(vector);
			const cube = {
				coordinate: new Point(0, 0, 0),
				size: { x: 2, y: 2, z: 0 },
			};
			
			const map = new Map();
			
			const collision = map.movementEngine.intersect(ray, <any>cube);
			
			expect(collision).to.equal(false);
		});
		
		it('should intersect with wall', () => {
			const vector = new Vector();
			vector.origin = new Point(0.5, 0.5, 0.5);
			vector.offset = new Point(1.5, 0.5, 0.5);
			const ray = new Ray(vector);
			const cube = {
				coordinate: new Point(1, 0, 0),
				size: { x: 0, y: 1, z: 1 },
			};
			
			const map = new Map();
			
			const collision = map.movementEngine.intersect(ray, <any>cube);
			
			expect(collision).to.equal(true);
		});
	});
});
