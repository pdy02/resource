/**
 * map.json文件类型
 */
declare type MapJsonT = {
    "type_map": {
        sys:{
            title:"系统",
            values:{
                windows:'win'
                "mac": "mac",
                "an": "安卓",
                "ios": "IOS",
                "web": "网页"
            }
        },
        "type": {
            "title": "类别",
            "values": {
                "com": "编程",
                "game": "娱乐",
                "learn": "学习"
            }
        }
    }
}

// 联合类型转成元组类型
type UnionToIntersection<U> = (U extends any ? (a: (k: U) => void) => void : never) extends (a: infer I) => void ? I : never;
type UnionLast<U> = UnionToIntersection<U> extends (a: infer I) => void ? I : never;
type UnionToTuple<U> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, UnionLast<U>>>, UnionLast<U>];

declare type MapKeyT = keyof MapJsonT['type_map'];
/**
 * map文件的筛选项title
 */
declare type ClassifyTitleT =  UnionToTuple<MapKeyT>;



/**
 * db.json文件的类型
 */
declare type DbT = {
    list:{
        /**
         * 资源名称
         */
        name: string,
        /**
         * 资源官网链接地址
         */
        url: string,
        /**
         * 资源logo的地址(非官方)
         */
        ico:string,
        /**
         * 资源类型-分类
         */
        type:string[],
        /**
         * 资源的tag
         */
        tag:string[],
        /**
         * 资源的简短介绍
         */
        info: string
    }[]
}

/**
 * nav.json
 */
declare type NavT = {
    title: string,
    href: string,
    child?: {
        group_title?: string,
        list:{
            name: string,
            href?: string,
        }[]
    }[]
}[]

declare type DetailsT = {
    /**
     * 资源标题
     */
    title: string
    /**
     * 资源图标ico
     */
    ico?: string
    /**
     * 资源介绍
     */
    info: string
    /**
     * 资源-优点
     */
    adv?: string[]
    /**
     * 资源-缺点
     */
    dis?: string[]
    /**
     * 资源链接地址
     */
    resource_link: DetailsTLink[]
}
type DetailsTLink = [string, string]
