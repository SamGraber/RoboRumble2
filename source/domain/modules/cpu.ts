import { IModule } from './module';
import { ModuleType } from './moduleType.enum';
import { Complexity } from './complexity.enum';

export interface CPU {
	cpuPriority: number;

	getComplexityLevel(type: ModuleType): Complexity;
	executeInstruction(phase: number, map): void;
}