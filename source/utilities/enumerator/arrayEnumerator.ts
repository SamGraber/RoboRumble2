// Public interface:

// bool moveNext()
// Summary: Advances the enumerator to the next item in the collection
// Returns: True if there is another item in the list or false if the enumeration is done.

// void reset()
// Summary: Returns this enumerator to the beginning of the collection.

// bool isDone()
// Summary: Determines if the enumerator has reached the end of the collection.
// Returns: True if there are no more items in the collection to enumerate.

// var current()
// Returns: Gets the currently enumerated item.

export class ArrayEnumerator {
	private done: boolean;
	private currentIndex: number;
	
	constructor(public array: any[]) {
		this.setIndex(-1);
	}

	moveNext(): boolean {
		const hasItem = !this.done;

		if (!this.done) {
			this.setIndex(this.currentIndex + 1);
		}

		return hasItem;
	}

	reset(): void {
		this.setIndex(-1);
	}

	isDone(): boolean {
		return this.done;
	}

	current(): any {
		if (this.currentIndex >= 0 && this.currentIndex < this.array.length) {
			return this.array[this.currentIndex];
		}
	}

	private setIndex(index: number): void {
		this.currentIndex = index;
		this.done = (this.array == null || this.currentIndex + 1 >= this.array.length);
	}
}