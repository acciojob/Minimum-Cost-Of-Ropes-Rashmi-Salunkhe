function calculateMinCost() {
    // Get the input value
    const input = document.getElementById('rope-lengths').value;
    // Parse input to an array of numbers
    const ropes = input.split(',').map(num => parseInt(num.trim(), 10));

    if (ropes.length < 2) {
        document.getElementById('result').innerText = "Need at least two ropes to connect.";
        return;
    }

    // Initialize a min-heap (using an array for simplicity)
    const minHeap = [];
    
    // Function to insert into the min-heap
    function insertHeap(val) {
        minHeap.push(val);
        let idx = minHeap.length - 1;
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (minHeap[idx] < minHeap[parentIdx]) {
                [minHeap[idx], minHeap[parentIdx]] = [minHeap[parentIdx], minHeap[idx]];
                idx = parentIdx;
            } else {
                break;
            }
        }
    }

    // Function to extract the minimum value from the heap
    function extractMin() {
        if (minHeap.length === 0) return null;
        const minVal = minHeap[0];
        const end = minHeap.pop();
        if (minHeap.length > 0) {
            minHeap[0] = end;
            let idx = 0;
            while (true) {
                const leftIdx = 2 * idx + 1;
                const rightIdx = 2 * idx + 2;
                let smallest = idx;
                
                if (leftIdx < minHeap.length && minHeap[leftIdx] < minHeap[smallest]) {
                    smallest = leftIdx;
                }
                if (rightIdx < minHeap.length && minHeap[rightIdx] < minHeap[smallest]) {
                    smallest = rightIdx;
                }
                if (smallest === idx) break;
                [minHeap[idx], minHeap[smallest]] = [minHeap[smallest], minHeap[idx]];
                idx = smallest;
            }
        }
        return minVal;
    }

    // Insert all ropes into the min-heap
    ropes.forEach(length => insertHeap(length));

    let totalCost = 0;

    // Combine ropes until only one rope remains
    while (minHeap.length > 1) {
        const first = extractMin();
        const second = extractMin();
        const cost = first + second;
        totalCost += cost;
        insertHeap(cost);
    }

    // Display the result
    document.getElementById('result').innerText = `Minimum Cost: ${totalCost}`;
}
