import { Robot } from './robot';
import { Chassis } from './chassis';
import { Complexity, SpeedyWheels, CPU, Module, ModuleType } from '../modules/index';
import { Instruction } from '../program/index';

describe('Robot', () => {
	it('should return the instructions that the robots modules support', () => {
		let robot = new Robot();
		robot.chassis = <any>{
			modules: [ new SpeedyWheels(robot) ],
		};
		const cpu = {
			getComplexityLevel: module => Complexity.simple,
		};

		const instructions = robot.getInstructionList(<any>cpu);

		expect(instructions).to.have.length(3);
		expect(instructions).to.contain(Instruction.move2);
		expect(instructions).to.contain(Instruction.turnLeft);
		expect(instructions).to.contain(Instruction.turnRight);
	});
	
	it('should not return duplicate instructions when modules share the same instruction', () => {
		let robot = new Robot();
		robot.chassis = <any>{
			modules: [
				{
					getInstructionList: () => [ Instruction.move1, Instruction.move2 ],
				},
				{
					getInstructionList: () => [ Instruction.move2, Instruction.move3 ],
				},
			],
		};
		const cpu = {
			getComplexityLevel: module => Complexity.simple,
		};

		const instructions = robot.getInstructionList(<any>cpu);

		expect(instructions).to.have.length(3);
		expect(instructions).to.contain(Instruction.move1);
		expect(instructions).to.contain(Instruction.move2);
		expect(instructions).to.contain(Instruction.move3);
	});
	
	it('should get the maximum complexity available in a cpu when getting all instructions', () => {
		let robot = new Robot();
		robot.chassis = new Chassis();
		robot.chassis.modules = <any>[ 
			new SpeedyWheels(robot),
			{
				type: ModuleType.cpu,
				getComplexityLevel: module => Complexity.simple,
				getInstructionList: () => [],
			},
			{
				type: ModuleType.cpu,
				getComplexityLevel: module => Complexity.moderate,
				getInstructionList: () => [],
			},
		];

		const instructions = robot.getAllInstructions();
		
		expect(instructions).to.have.length(4);
		expect(instructions).to.contain(Instruction.turnLeft);
		expect(instructions).to.contain(Instruction.turnRight);
		expect(instructions).to.contain(Instruction.move2);
		expect(instructions).to.contain(Instruction.move3);
	});
	
	describe('turns', () => {
		let turns = 0;

		it('should run all cpus', () => {
			turns = 0;
			
			const robot = new Robot();
		
			const cpu1 = new CPUEmulator();
			const cpu2 = new CPUEmulator();
			const cpu3 = new CPUEmulator();
			
			robot.chassis = new Chassis();
			robot.chassis.modules = [ cpu1, cpu2, cpu3 ];
			
			robot.executePhase(1, {});
			
			expect(turns).to.equal(3);
		});
		
		class CPUEmulator extends Module implements CPU {
			type = ModuleType.cpu;
			cpuPriority = 0;
			turns = 0;

			refesh = () => {};

			getComplexityLevel = type => { return null };

			executeInstruction(): void {
				turns++;
				this.turns++;
			}
		}
	});
	
	// it('should run the instruction and move 1 space', () => {
	// 	//integration test for robot, cpu, programInstruction, drive, and map
	// 	const floor = new ConcreteBlock();
	// 	floor.coordinate = new Point(0, 0, 1);
	// 	floor.size = new Size(2, 2, 0);
		
	// 	const robot = new Robot();
	// 	robot.coordinate = new Point(0, 0, 1);
	// 	robot.heading = heading.south;
		
	// 	const drive = new BasicWheels(robot);
	
	// 	const cpu = new BasicProcessor(robot);
	// 	cpu.instructions = { '1': new ProgramInstruction(drive, instruction.move1) };
		
	// 	robot.chassis = new Chassis();
	// 	robot.chassis.modules = [ cpu, drive ];
		
	// 	const map = new Map();
	// 	map.items.push(floor);
	// 	map.items.push(robot);
		
	// 	robot.executePhase(1, map);
		
	// 	expect(robot.coordinate.x).to.equal(0);
	// 	expect(robot.coordinate.y).to.equal(1);
	// 	expect(robot.coordinate.z).to.equal(1);
	// });
});