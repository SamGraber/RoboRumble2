import { MapItem, MapItemType } from '../map/mapItem/index';
import { Point, Size } from '../../utilities/angles/index';

export class ConcreteBlock extends MapItem {
	type: MapItemType = MapItemType.boardElement;
}
