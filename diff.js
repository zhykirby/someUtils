const oldTree = {
    value: 'div',
    children: [
        {
            value: 'h1',
            children: [{
                value: 'a',
                children: null
            }]
        },
        {
            value: 'h1',
            children: [{
                value: 'b',
                children: null
            }]
        },
        {
            value: 'h1',
            children: [{
                value: 'c',
                children: null
            }]
        }
    ]
};

const newTree = {
    value: 'div',
    children: [
        {
            value: 'h1',
            children: [{
                value: '1',
                children: null
            }]
        },
        {
            value: 'h1',
            children: [{
                value: 'b',
                children: null
            }]
        },
        {
            value: 'h1',
            children: [{
                value: '3',
                children: null
            }]
        }
    ]
};

// 简便版
const isEqual = (value, compareValue) => {
    const valueType = typeof value;
    const compareValueType = typeof compareValue;
    const easyCompare = ['string', 'number', 'boolean'];
    const noCompare = ['undefined', 'null'];
    if (valueType !== compareValueType || noCompare.includes(valueType) || noCompare.includes(compareValueType)) return false; // 不建议这么写
    if (easyCompare.includes(valueType)) return value === compareValue;
    // object && function 不写了
}
/**
 * 
 * @param {Array} oldTreeChildren 
 * @param {Array} newTreeChildren 
 * @param {number} index 
 * @param {Array} patches 
 */
const diffChildren = (oldTreeChildren, newTreeChildren, index, patches) => {
    const isOldLonger = oldTreeChildren.length >= newTreeChildren.length;
    let currentIndex = index;
    if (isOldLonger) {
        oldTreeChildren.map((item, key) => {
            if (newTreeChildren[key]) {
                const {index: newIndex} = walk(item, newTreeChildren[key], currentIndex, patches);
                currentIndex = newIndex;
                return {patches, index: currentIndex};
            }
            const diffValue = [{type: 'remove', node: null}];
            patches.push({[currentIndex]: diffValue});
            currentIndex++
        });
    }
    else {
        newTreeChildren.map((item, key) => {
            if (oldTreeChildren[key]) {
                const {index: newIndex} = walk(item, oldTreeChildren[key], currentIndex, patches);
                currentIndex = newIndex;
                return {patches, index: currentIndex};
            }
            const diffValue = [{type: 'insert', node: item}];
            patches.push({[currentIndex]: diffValue});
            currentIndex++
        });
    }
    return {patches, index: currentIndex};
};

/**
 * 遍历比较新旧节点
 * @param {Object} oldTreeNode 旧树节点
 * @param {Object} newTreeNode 新树节点
 * @param {number} index 当前位置
 * @param {Array} patches 记录变化用于更新
 * @return {Object} 一个包含index和patches的对象
 */
const walk = (oldTreeNode, newTreeNode, index, patches) => {
    const {value: oldTreeValue, children: oldTreeChildren} = oldTreeNode;
    const {value: newTreeValue, children: newTreeChildren} = newTreeNode;
    // 当前节点值是否改变
    const valueIsDiff = !isEqual(oldTreeValue, newTreeValue);
    // 值改变时标记replace来更新
    const diffValue = [{type: 'replace', value: newTreeValue}];
    // 旧树有children 新树有children 往下走比较children
    if (oldTreeChildren && newTreeChildren) {
        valueIsDiff && patches.push({[index]: diffValue});
        index++;
        return diffChildren(oldTreeChildren, newTreeChildren, index, patches);
    }
    // 旧树有children 新树无children 表示新树的children被删了 标记remove来更新
    if (oldTreeChildren) {
        diffValue.push({type: 'remove', value: null});
        valueIsDiff && patches.push({[index]: diffValue});
        index++;
        return {patches, index};
    }
    // 旧树无children 新树无children 表示新加的children 标记insert来更新
    if (newTreeChildren) {
        diffValue.push({type: 'insert', value: newTreeChildren});
        valueIsDiff && patches.push({[index]: diffValue});
        index++;
        return {patches, index};
    }
    valueIsDiff && patches.push({[index]: diffValue});
    index++;
    return {patches, index};
};

/**
 * diff入口
 * @param {Object} oldTree 旧树
 * @param {Object} newTree 新树
 * @return {}
 */
const diff = (oldTree, newTree) => {
    const index = 0;
    const patches = [];
    walk(oldTree, newTree, index, patches);
    return patches;
};

const patches = diff(oldTree, newTree);
console.log(JSON.stringify(patches));
