import { SpeedyWheels } from './speedyWheels';
import { Instruction } from '../../program/index';
import { Complexity } from '../../modules/index';
import { Rotation } from '../../movement/movement';

interface IMover {
	move: Sinon.SinonSpy;
	turn: Sinon.SinonSpy;
}

describe('SpeedyWheels', () => {
	let mover: IMover;

	beforeEach(() => {
		mover = {
			move: sinon.spy(),
			turn: sinon.spy(),
		};
	});

	it('should provide a known list of move instructions with simple complexity', () => {
		const module = new SpeedyWheels(<any>{});
		const expectedInstructions = [
			Instruction.move2,
			Instruction.turnLeft,
			Instruction.turnRight,
		];
		
		const availableInstructions = module.getInstructionList(Complexity.simple);

		expect(availableInstructions).to.deep.equal(expectedInstructions);
	});

	it('should provide a known list of move instructions with moderate complexity', () => {
		const module = new SpeedyWheels(<any>{});
		const expectedInstructions = [
			Instruction.move2,
			Instruction.turnLeft,
			Instruction.turnRight,
			Instruction.move3,
		];
		
		const availableInstructions = module.getInstructionList(Complexity.moderate);

		expect(availableInstructions).to.deep.equal(expectedInstructions);
	});
	
	it('should move two spaces', () => {
		const drive = new SpeedyWheels(null);
		drive.execute(Instruction.move2, <any>mover);
		sinon.assert.calledTwice(mover.move);
	});
	
	it('should move three spaces', () => {
		const drive = new SpeedyWheels(null);
		drive.execute(Instruction.move3, <any>mover);
		sinon.assert.calledThrice(mover.move);
	});
	
	it('should rotate right', () => {
		const robot = {};
		const drive = new SpeedyWheels(<any>robot);
		
		drive.execute(Instruction.turnRight, <any>mover);
		
		sinon.assert.calledOnce(mover.turn);
		sinon.assert.calledWith(mover.turn, robot, Rotation.clockwise);
	});
	
	it('should rotate left', () => {
		const robot = {};
		const drive = new SpeedyWheels(<any>robot);
		
		drive.execute(Instruction.turnLeft, <any>mover);
		
		sinon.assert.calledOnce(mover.turn);
		sinon.assert.calledWith(mover.turn, robot, Rotation.counterClockwise);
	});
});