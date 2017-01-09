import { MapItemType } from './mapItem/index';
import { Robot } from '../robot/index';
import { Map } from './map';

describe('Map', () => {
	it('should get all robots', () => {
		const robot = new Robot();
		
		const npc = {
			type: MapItemType.npc
		};
		
		const boardElement = {
			type: MapItemType.boardElement
		};
		
		const map = new Map();
		map.items.push(robot);
		map.items.push(<any>npc);
		map.items.push(<any>boardElement);
		
		const robots = map.getRobots();
		
		expect(robots).to.contain(robot);
		expect(robots).to.not.contain(npc);
		expect(robots).to.not.contain(boardElement);
	});
	
	it('should get all npcs', () => {
		const npc = {
			type: MapItemType.npc
		};
		
		const boardElement = {
			type: MapItemType.boardElement
		};
		
		const robot = new Robot();
		
		const map = new Map();
		map.items.push(<any>npc);
		map.items.push(<any>boardElement);
		map.items.push(robot);
		
		const npcs = map.getNPCs();
		
		expect(npcs).to.contain(npc);
		expect(npcs).to.not.contain(boardElement);
		expect(npcs).to.not.contain(robot);
	});
	
	it('should get all board elements', () => {
		const boardElement = {
			type: MapItemType.boardElement
		};
		
		const npc = {
			type: MapItemType.npc
		};
		
		const robot = new Robot();
		
		const map = new Map();
		map.items.push(<any>boardElement);
		map.items.push(<any>npc);
		map.items.push(robot);
		
		const boardElements = map.getBoardElements();
		
		expect(boardElements).to.contain(boardElement);
		expect(boardElements).to.not.contain(npc);
		expect(boardElements).to.not.contain(robot);
	});
});