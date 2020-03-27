// 大顶堆
function swap (arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function heapify (arr, i) {
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

function buildHeap (arr) {
    let len = arr.length;
    if (len == 0) return;
    for (let i = Math.floor(len / 2);i > 0;i--){
        heapify(arr, i);
    }
}

function heapSort (arr) {
    let len = arr.length;
    buildHeap(arr);
    for (let i = len - 1;i >0;i--) {
        swap(arr, 0, i);
        heapify(arr, i);
    }
    return arr;
}