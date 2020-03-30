class Heap {
    heap: Array<number>;
    constructor () {
        this.heap = [];
    }

    swap (arr:Array<number>, i:number, j:number) : void {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    } 

    heapify (arr:Array<number>, i:number) : void {
        let largest = i;
        let len = arr.length;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < len && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < len && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== i) {
            swap(arr, i, largest);
            heapify(arr, largest);
        }
    }

    buildHeap (arr:Array<number>) : void {
        let len = arr.length;
        if (len == 0) return;
        for (let i = Math.floor(len / 2);i > 0;i--){
            heapify(arr, i);
        }
    }

    heapSort (arr:Array<number>) : Array<number> {
        let len = arr.length;
        buildHeap(arr);
        for (let i = len - 1;i >0;i--) {
            swap(arr, 0, i);
            heapify(arr, i);
        }
        return arr;
    }
}