import { BoardElement } from './boardElement';
import { BoardElementType } from './boardElementType.enum';
import { BoardElementPriorities } from './boardElementPriorities.enum';
import { Robot } from '../robot/index';
import { Map } from '../map/map';

export class ConcreteBlock extends BoardElement {
	elementType: BoardElementType = BoardElementType.default;
	priority: BoardElementPriorities = BoardElementPriorities.none;
}
