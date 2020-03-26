/**
 * type a = {
 *  priority : number;
 *  value : number | string | object | array;
 *  otherValue? : number | string | object | array;
 * }
 */
function PQueue () {
    this.pqueue = [];
}

// 优先级对比
PQueue.prototype.cmp = (a, b) => {
    return a.priority > b.priority;
}

PQueue.prototype.swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// 上调
PQueue.prototype._headUpAdjust = (index) => {
    let pqueue = this.pqueue;
    let now = pqueue[index];
    let cmp = this.cmp;
    while (index > 0) {
        let parent_index = Math.floor((index - 1) / 2);
        let parent = pqueue[parent_index];
        if (cmp(now, parent)) {
            pqueue[index] = parent;
            index = parent_index;
        } else {
            break;
        }
    }
    pqueue[index] = now
}

// 下降
PQueue.prototype._headDownAdjust = (index) => {
    let pqueue = this.pqueue;
    let largest = index;
    let cmp = this.cmp;
    let swap = this.swap
    let length = pqueue.length;
    let left = 2 * index + 1;
    let right = left + 1;
    if (left < length && cmp(pqueue[left], pqueue[largest])) {
        largest = left;
    }
    if (right < length && cmp(pqueue[right], pqueue[largest])) {
        largest = right;
    }
    if (largest !== index) {
        swap(pqueue, index, largest);
        // 继续下潜
        this._headDownAdjust(largest);
    }
}

// 销毁
PQueue.prototype.destrory = () => {
    this.pqueue = null;
}

// 入队
PQueue.prototype.enQueue = (data) => {
    let pqueue = this.pqueue;
    pqueue.push(data);
    // 新数据根据优先级冒泡
    this._headUpAdjust(pqueue.length - 1);
}

// 出队
PQueue.prototype.deQueue = () => {
    let pqueue = this.pqueue;
    if (!pqueue.length) return undefined;
    return pqueue.splice(0, 1);
}

// 出队2.0
PQueue.prototype.dequeue = () => {
    let pqueue = this.pqueue;
    if (!pqueue.length) return undefined;
    let head = pqueue[0];
    if (pqueue.length == 1) {
        pqueue = [];
    } else {
        pqueue[0] = pqueue.pop();
        this._headDownAdjust(0);
    }
    return head;
}

PQueue.prototype.getLength = () => {
    return this.pqueue.length;
}

PQueue.prototype.isEmpty = () => {
    return this.pqueue.length === 0;
}

PQueue.prototype.clear = () => {
    this.pqueue = [];
}

PQueue.prototype.getHead = () => {
    return this.pqueue[0];
}

export default PQueue;