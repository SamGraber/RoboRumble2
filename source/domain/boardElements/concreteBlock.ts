import { BoardElement } from './boardElement';
import { BoardElementType } from './boardElementType.enum';

export class ConcreteBlock extends BoardElement {
	elementType: BoardElementType = BoardElementType.default;
}
