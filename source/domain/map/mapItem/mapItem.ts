import { Permeability } from './permeability.enum';
import { MapItemType } from './mapItemType.enum';
import { Point, Size } from '../../../utilities/angles/index';

export abstract class MapItem {
	abstract type: MapItemType;
	coordinate: Point;
	size: Size;
	permeability: Permeability = Permeability.nonpermeable;
}
