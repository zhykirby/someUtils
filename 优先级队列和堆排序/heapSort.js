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
// ========================================================
// heap sort 优化

const isEqual = (value, compareValue) => {
    const valueType = typeof value;
    const compareValueType = typeof compareValue;
    const easyCompare = ['string', 'number', 'boolean'];
    const noCompare = ['undefined', 'null'];
    if (valueType !== compareValueType || noCompare.includes(valueType) || noCompare.includes(compareValueType)) return false; // 不建议这么写
    if (easyCompare.includes(valueType)) return value === compareValue;
    // object && function 不写了
};

const swap = (arr, index, changeIndex) => {
    const temp = arr[index];
    arr[index] = arr[changeIndex];
    arr[changeIndex] = temp;
    return arr;
};

const getLargestIndex = (arr, len, index) => {
    // 🌲的👈和👉 这样打注释感觉会被打
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    // 没超出长度，且确实比当前节点大，换位
    if (left < len && arr[left] > arr[index]) {
        index = left;
    }
    if (right < len && arr[right] > arr[index]) {
        index = right;
    }
    return index;
};

// 大顶化
const heapify = (arr, index, len) => {
    const largestIndex = getLargestIndex(arr, len, index);
    // 将较大的换上来后，继续大顶化
    if (!isEqual(index, largestIndex)) {
        swap(arr, index, largestIndex);
        return heapify(arr, index, len);
    }
    return arr;
    // return !isEqual(index, largestIndex) ? swapAndHeapify(arr, index, largestIndex) : arr;
};

const heapSort = (arr, index) => {
    for (let i = index;i > 0;i--) {
        // 将大的换到最后
        swap(arr, 0, i);
        heapify(arr, 0, i);
    }
    return arr;
};

// 构建堆 堆的数据结构就行
const buildHeap = (arr, len) => {
    for (let i = Math.floor(len / 2 - 1);i > 0;i--) {
        arr = heapify(arr, i, len);
    }
    return arr;
}

const entry = arr => {
    const len = arr.length;
    if (len === 0) return arr;
    buildHeap(arr, len);
    heapSort(arr, len - 1);
    return arr;
};

