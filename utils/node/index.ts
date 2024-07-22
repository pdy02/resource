import path from 'node:path'
import fs from "node:fs";

/**
 * docs目录位置
 */
export const __DOCS__ = path.resolve(process.cwd(), './static/docs');

/**
 * 获取有 "详情地址" 的页面
 */
export const getDetailsPaths = () => {
    const DOCS_PATH = path.resolve(__DOCS__);
    const files = fs.readdirSync(DOCS_PATH);
    return files.map(file => {
        if(path.extname(path.join(DOCS_PATH, file)) === '.json'){
            return file.slice(0,-5)
        }
    })
}