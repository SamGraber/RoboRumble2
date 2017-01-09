import { MapItem, MapItemType } from '../map/mapItem/index';
import { BoardElementType } from './boardElementType.enum';
import { BoardElementPriorities } from './boardElementPriorities.enum';
import { Robot } from '../robot/index';
import { MovementEngine } from '../movement/movement';

export abstract class BoardElement extends MapItem {
	type: MapItemType = MapItemType.boardElement;
	abstract elementType: BoardElementType;
	abstract priority: BoardElementPriorities;

	execute(robot: Robot, mover: MovementEngine, phase: number): void {
		throw new Error('Not implemented');
	}
}
