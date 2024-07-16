// md文件编译器

const identityMap = new Map([
    ["#", "h1"],
    ["##", "h2"],
    ["###", "h3"],
    ["####", "h4"],
    ["#####", "h5"],
    ["######", "h6"],
    ["-", "li"],
])


/**
 * 编译函数
 * @param ctn
 */
export const compile = (ctn: string):any[] => {
    console.log("断点1-compile", ctn);
    // 以"换行"为分隔
    return ctn.split('\r\n\r\n').map(line => {
        return handleLine(line)
    })
}

/**
 * 处理一行文本的处理器
 * @param line
 */
function handleLine(line: string){
    if (line === '\r\n') {
        return {
            value: '',
        }
    }
    // 以 "换行" 分隔
    const arr = line.split('\r\n').map(str => {
        return transform(str)
    })
    // 整合
    const resList = []
    const temp = {}
    arr.forEach(item => {
        for (let itemKey in item) {
            if (itemKey === 'li'){
                resList.push(item)
                continue
            }
            const itemVal = item[itemKey];
            if (temp[itemKey] === undefined) {
                temp[itemKey] = ''
            }
            temp[itemKey] += itemVal
        }
    })
    return temp;
}

/**
 * 变换函数 - '# 标题1' -> { h1:"标题1" }
 * @param line
 */
function transform(line: string){
    const start = line.split(' ')[0] || ''
    const identityValue = identityMap.get(start)
    if(identityValue){ // 判断开头是不是有md语法
        return {// 做一个语法替换
            [identityValue]: line.replace(start+' ', '')
        }
    }else{
        // 如果不是, 说明是正文内容
        return  {
            value: line
        }
    }
}