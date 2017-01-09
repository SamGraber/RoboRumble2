import { MapItem, MapItemType } from '../map/mapItem/index';
import { BoardElementType } from './boardElementType.enum';

export abstract class BoardElement extends MapItem {
	type: MapItemType = MapItemType.boardElement;
	abstract elementType: BoardElementType;
}
