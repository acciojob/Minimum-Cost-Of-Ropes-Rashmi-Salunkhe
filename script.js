function calculateMinCost() {
    let input = document.getElementById("rope-lengths").value;
    let lengths = input.split(",").map(Number);
    let result = minCostToConnectRopes(lengths);
    document.getElementById("result").innerText = "Minimum cost: " + result;
}

function minCostToConnectRopes(lengths) {
    if (lengths.length === 0) return 0;

    // Use a min-heap to always get the two smallest ropes
    let heap = new MinHeap();
    for (let length of lengths) {
        heap.insert(length);
    }

    let totalCost = 0;
    while (heap.size() > 1) {
        let first = heap.extractMin();
        let second = heap.extractMin();
        let cost = first + second;
        totalCost += cost;
        heap.insert(cost);
    }

    return totalCost;
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this._bubbleUp();
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._sinkDown(0);
        return min;
    }

    size() {
        return this.heap.length;
    }

    _bubbleUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.heap[parentIdx];
            if (element >= parent) break;
            this.heap[idx] = parent;
            this.heap[parentIdx] = element;
            idx = parentIdx;
        }
    }

    _sinkDown(idx) {
        const length = this.heap.length;
        const element = this.heap[idx];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (leftChild < element) {
                    swap = leftChildIdx;
                }
            }

            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if ((swap === null && rightChild < element) ||
                    (swap !== null && rightChild < leftChild)) {
                    swap = rightChildIdx;
                }
            }

            if (swap === null) break;
            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
}
