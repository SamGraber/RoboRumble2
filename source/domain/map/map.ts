import { filter } from 'lodash';

import { MapItem, MapItemType } from './mapItem/index';
import { BoardElement } from '../boardElements/boardElement';
import { MovementEngine } from '../movement/movement';
import { Robot } from '../robot/index';

export class Map {
	game;
	movementEngine: MovementEngine;
	items: MapItem[] = [];
	bottom: number = -5;

	constructor() {
		this.movementEngine = new MovementEngine(this);
	}

	getRobots(): Robot[] {
		return <any[]>filter(this.items, item => item.type == MapItemType.robot);
	}

	getNPCs(): MapItem[] {
		return filter(this.items, item => item.type == MapItemType.npc);
	}

	getBoardElements(): BoardElement[] {
		return <any[]>filter(this.items, item => item.type == MapItemType.boardElement);
	}
}