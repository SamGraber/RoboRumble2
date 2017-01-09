import { IModule } from './module';
import { ModuleType } from './moduleType.enum';
import { Complexity } from './complexity.enum';
import { MovementEngine } from '../movement/movement';

export interface CPU {
	cpuPriority: number;

	getComplexityLevel(type: ModuleType): Complexity;
	executeInstruction(phase: number, mover: MovementEngine): void;
}