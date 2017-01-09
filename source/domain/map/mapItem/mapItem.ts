import { Permeability } from './permeability.enum';
import { MapItemType } from './mapItemType.enum';
import { Point, Size } from '../../../utilities/angles/index';

export interface IMapItem {
	type: MapItemType;
	coordinate: Point;
	size: Size;
	permeability: Permeability;
}

export interface IMoveableMapItem extends IMapItem {
	heading: Point;
}

export abstract class MapItem implements IMapItem {
	abstract type: MapItemType;
	coordinate: Point;
	size: Size;
	permeability: Permeability = Permeability.nonpermeable;
}
