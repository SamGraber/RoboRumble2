import { BasicWheels } from './basicWheels';
import { Instruction } from '../../program/index';
import { Rotation } from '../../movement/movement';

interface IMover {
	move: Sinon.SinonSpy;
	turn: Sinon.SinonSpy;
}

describe('BasicWheels', () => {
	let mover: IMover;

	beforeEach(() => {
		mover = {
			move: sinon.spy(),
			turn: sinon.spy(),
		};
	});

	it('should provide a known list of move instructions with simple complexity', () => {
		const module = new BasicWheels(<any>{});
		const expectedInstructions = [
			Instruction.move1,
			Instruction.move2,
			Instruction.turnLeft,
			Instruction.turnRight,
			Instruction.uTurn,
		];
		
		const availableInstructions = module.getInstructionList();

		expect(availableInstructions).to.deep.equal(expectedInstructions);
	});

	it('should move one space', () => {
		const drive = new BasicWheels(null);
		drive.execute(Instruction.move1, <any>mover);
		sinon.assert.calledOnce(mover.move);
	});
	
	it('should move two spaces', () => {
		const drive = new BasicWheels(null);
		drive.execute(Instruction.move2, <any>mover);
		sinon.assert.calledTwice(mover.move);
	});
	
	it('should rotate right', () => {
		const robot = {};
		const drive = new BasicWheels(<any>robot);
		
		drive.execute(Instruction.turnRight, <any>mover);
		
		sinon.assert.calledOnce(mover.turn);
		sinon.assert.calledWith(mover.turn, robot, Rotation.clockwise);
	});
	
	it('should rotate left', () => {
		const robot = {};
		const drive = new BasicWheels(<any>robot);
		
		drive.execute(Instruction.turnLeft, <any>mover);
		
		sinon.assert.calledOnce(mover.turn);
		sinon.assert.calledWith(mover.turn, robot, Rotation.counterClockwise);
	});
	
	it('should rotate twice to the right', () => {
		const robot = {};
		const drive = new BasicWheels(<any>robot);
		
		drive.execute(Instruction.uTurn, <any>mover);
		
		sinon.assert.calledTwice(mover.turn);
		sinon.assert.calledWith(mover.turn, robot, Rotation.clockwise);
	});
});