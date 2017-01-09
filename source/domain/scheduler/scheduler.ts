import { filter, each, sortBy, reverse } from 'lodash';

import { Map } from '../map/map';
import { Robot } from '../robot/index';
import { BoardElement } from '../boardElements/boardElement';
import { ArrayEnumerator } from '../../utilities/enumerator/arrayEnumerator';
import { BoardElementPriorities } from '../boardElements/boardElementPriorities.enum';
import { Point } from '../../utilities/angles/index';

//the scheduler runs each of the robot turns, followed by the npcs, and finally the board elements.
//then optionally the robots and npcs get another chance to take an end-of-turn action.
//the scheduler has four public functions, newTurn, initPhase, runNext and runAll.
export class Scheduler {
	phase: number = 0;

	robotEnumerator: ArrayEnumerator;
	npcEnumerator: ArrayEnumerator;
	boardElementEnumerator: ArrayEnumerator;

	constructor(public map: Map) {}

	newTurn(): void {
		this.phase = 0;
	}

	initPhase(): boolean {
		if (this.phase <= this.map.game.phasesPerTurn) {
			//reinitialize the enumerators each phase, in order to sort by priority
			this.phase++;
			const sortedRobotList = reverse(sortBy(this.map.getRobots(), robot => robot.priorities[this.phase]));
			this.robotEnumerator = new ArrayEnumerator(sortedRobotList);
			this.npcEnumerator = new ArrayEnumerator(this.map.getNPCs());
			this.boardElementEnumerator = new ArrayEnumerator(sortedRobotList);	//enumerates robots to activate the board elements nearby
			return true;
		} else {
			return false;
		}
	}

	runAll(): void {
		let endOfTurn = !this.runNext();

		while(!endOfTurn) {
			endOfTurn = !this.runNext();
		}
	}

	runNext(): boolean {
		if (this.robotEnumerator.moveNext())
		{
			this.takeRobotTurn(this.robotEnumerator.current());
		}
		else if (this.npcEnumerator.moveNext())
		{
			this.takeNPCTurn(this.npcEnumerator.current());
		}
		else if (this.boardElementEnumerator.moveNext())
		{
			this.takeBoardElementTurn(this.boardElementEnumerator.current());
		}
		else
		{
			return false;
		}
		
		return true;
	}

	private takeRobotTurn(robot: Robot): void {
		robot.executePhase(this.phase, this.map);
	}

	private takeNPCTurn(npc): void {

	}

	takeBoardElementTurn(robot: Robot): void {
		// cycle through each boardElement priority level
		for (var i = BoardElementPriorities.highest; i >= 0; i--)
		{
			const elements = filter(this.map.getBoardElements(), touchesRobotSpace);
			each(elements, run.bind(this));
		}
		
		function touchesRobotSpace(element: BoardElement) {
			return element.coordinate.equals(robot.coordinate)
					|| element.coordinate.equals(robot.coordinate.add(new Point(1, 0, 0)))	//touches the right side of the robot's space
					|| element.coordinate.equals(robot.coordinate.add(new Point(0, 1, 0)))	//touches the south side of the robot's space
					|| element.coordinate.equals(robot.coordinate.add(new Point(0, 0, 1)));	//touches the top of the robot's space
		}
		
		function run(element: BoardElement) {
			if (element.priority[i] === true)
			{
				element.execute(robot, this.map, this.phase);
			}
		}
	}
}
