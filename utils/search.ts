/**
 * 搜索函数
 */
export const search = (key: string, list: DbT["list"]) => {
    const so = getParams(key)
    return list.filter(item => {
        let n = 0;
        if (so.tag) {
            const temp = comparingArray(so.tag, item.tag)
            temp && n++
        }
        // 全转成小写比较
        so.value.toLowerCase() && item.name.toLowerCase().search(so.value.toLowerCase()) > -1 && n++
        return !!n
    })
}

type SearchObject = {
    /**
     * 搜索参数tag
     */
    tag?: string[]
    /**
     * 搜索正文
     */
    value: string
}

/**
 * 搜索参数整合
 */
function getParams(key: string): SearchObject {
    key = key.trim();// 去除两边空格
    if (!key) return {
        value: ''
    }
    const res: SearchObject = {
        value: ''
    }
    key.split(' ').forEach(chunk => {
        if (chunk.startsWith('@')) { // @符号开头: 指定搜索tag
            res.tag = res.tag || []; // 定义好tag数组
            // 再检查一下本段tag搜索是不是几个tag连在一起(如:@前端/构建)
            chunk = chunk.slice(1); // 舍弃开头的@
            const tags = chunk.split('/');
            for (let str of tags) {
                if (str) {
                    res.tag.push(str)
                }
            }
        } else { // 搜索正文value
            res.value = chunk
        }
    })
    return res;
}


/**
 * 比较两个数组元素是否有重合
 */
function comparingArray(arr1: any[], arr2: any[]): boolean {
    if(!arr1 || !arr2){
        return false;
    }
    return !!arr1.filter(x => arr2.includes(x)).length
}