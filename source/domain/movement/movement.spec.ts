import { MovementEngine, Rotation } from './movement';
import { heading } from '../../utilities/angles/index';

interface MapMock {
	move: Sinon.SinonSpy;
}

describe('MovementEngine', () => {
	let movementEngine: MovementEngine;
	let map: MapMock;

	beforeEach(() => {
		map = { move: sinon.spy() };
		movementEngine = new MovementEngine(<any>map);
	});

	it('should tell the map to move the item', () => {
		const item = { heading: '123' };

		movementEngine.move(<any>item);

		sinon.assert.calledOnce(map.move);
		sinon.assert.calledWith(map.move, item, item.heading);
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
