import { Scheduler } from './scheduler';
import { Map } from '../map/map';
import { Robot } from '../robot/index';
import { BoardElement } from '../boardElements/boardElement';
import { MapItem, MapItemType } from '../map/mapItem/index';
import { Point } from '../../utilities/angles/index';

describe('Scheduler', () => {
	let turns;
	
	it('should run one robot', () => {
		turns = 0;
		const game: any = {};
		game.phasesPerTurn = 1;
	
		const robot1 = new RobotEmulator();
		const robot2 = new RobotEmulator();
		
		const map = new Map();
		map.items.push(robot1);
		map.items.push(robot2);
		map.game = game;
		
		const scheduler = new Scheduler(map);
		scheduler.initPhase();
		scheduler.runNext();
		
		expect(turns).to.equal(1);
	});
	
	it('should sort robots by priority and run the highest priority', () => {
		turns = 0;
		const game: any = {};
		game.phasesPerTurn = 1;
	
		const robot1 = new RobotEmulator();
		robot1.priorities = { '1': 300 };		//turn phases are 1 based, so the first priority will always be ignored
		
		const robot2 = new RobotEmulator();
		robot2.priorities = { '1': 350 };
		
		const map = new Map();
		map.items.push(robot1);
		map.items.push(robot2);
		map.game = game;
		
		const scheduler = new Scheduler(map);
		scheduler.initPhase();
		scheduler.runNext();
		
		expect(turns).to.equal(1);
		expect(robot1.turns).to.equal(0);
		expect(robot2.turns).to.equal(1);
	});
	
	it('should run robots in order of priority each phase', () => {
		turns = 0;
		const game: any = {};
		game.phasesPerTurn = 2;
	
		const robot1 = new RobotEmulator();
		robot1.priorities = { '1': 300, '2': 375 };
		
		const robot2 = new RobotEmulator();
		robot2.priorities = { '1': 350, '2': 275 };
		
		const map = new Map();
		map.items.push(robot1);
		map.items.push(robot2);
		map.game = game;
		
		const scheduler = new Scheduler(map);
		scheduler.initPhase();
		scheduler.runNext();
		
		expect(robot1.turns).to.equal(0);
		expect(robot2.turns).to.equal(1);
		
		scheduler.runNext();
		
		expect(robot1.turns).to.equal(1);
		
		scheduler.initPhase();
		scheduler.runNext();
		
		expect(robot1.turns).to.equal(2);
		expect(robot2.turns).to.equal(1);
		
		scheduler.runNext();
		
		expect(robot2.turns).to.equal(2);
		expect(turns).to.equal(4);
	});
	
	it('should run all robots', () => {
		turns = 0;
		const game: any = {};
		game.phasesPerTurn = 1;
	
		const robot1 = new RobotEmulator();
		const robot2 = new RobotEmulator();
		const robot3 = new RobotEmulator();
		
		const map = new Map();
		map.items.push(robot1);
		map.items.push(robot2);
		map.items.push(robot3);
		map.game = game;
		
		const scheduler = new Scheduler(map);
		scheduler.initPhase();
		scheduler.runAll();
		
		expect(turns).to.equal(3);
	});

	class RobotEmulator extends MapItem {
		type = MapItemType.robot;
		priorities = {};
		turns = 0;

		executePhase() {
			turns++;
			this.turns++;
		}
	}
	
	it('should run all board elements touching the current robot', () => {
		turns = 0;
		
		const belt = new BoardElementEmulator();
		belt.priority = { '6': true };
		belt.coordinate = new Point(0, 0, 0);
		
		const pusher = new BoardElementEmulator();
		pusher.priority = { '5': true };
		pusher.coordinate = new Point(1, 0, 0);
		
		const crusher = new BoardElementEmulator();
		crusher.priority = { '3': true };
		crusher.coordinate = new Point(0, 0, 1);
		
		const robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		
		const map = new Map();
		map.items.push(robot);
		map.items.push(belt);
		map.items.push(pusher);
		map.items.push(crusher);
		
		const scheduler = new Scheduler(map);
		scheduler.takeBoardElementTurn(robot);
		
		expect(turns).to.equal(3);
		expect(belt.turns).to.equal(1);
		expect(pusher.turns).to.equal(1);
		expect(crusher.turns).to.equal(1);
	});

	class BoardElementEmulator extends BoardElement {
		elementType = null;
		priority = <any>{};
		turns = 0;

		execute() {
			turns++;
			this.turns++;
		}
	}
});