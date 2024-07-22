/**
 * 分类页面
 */
import React, {useEffect, useMemo, useState} from 'react';
import ClassifyScreening from "../components/classification/classifyScreening";
import sty from '../styles/modules/classification.module.css'
import NavigationBar from '../components/global/navigationBar';
import {useRouter} from "next/router";
import {search} from "../utils";
import classifySearchBox from '../components/classification/classifySearchBox';
import Popup from '../components/global/popup'
import imgError from '../public/images/img-failure.svg';
import { getDetailsPaths } from "../utils/node";
import {PopupData} from "../types";

interface Props {
    navData: NavT
    db: DbT
    map: MapJsonT
    paths: string[]
}

export type ClasType = {
    [key in ClassifyTitleT[number]]: string
}

export default function Classification(props: Props) {
    const router = useRouter()
    useEffect(() => {
        // TODO: router会变化两次
        setClas(clasInit()) // 重新设置clas
    }, [router.query]);

    // TODO: 根据获取的map映射出筛选项
    const classifyMap = useMemo(() => {
        const map = props.map.type_map; // 遍历对象
        type Val = {
            "key": string
            "value": string
        }
        type Vals = Val[]
        /*
        * name: sys
        * title: 系统
        * vals: {
        *   key: "windows"
        *   value: "win"
        * }[]
        * */
        const list: {
            name: string
            title: string
            vals: (Val | string)[]
        }[] = [];
        for (let mapKey in map) {
            // @ts-ignore
            const val = map[mapKey];
            const obj: {
                name: string
                title: string
                vals: Vals
            } = {
                name: mapKey,
                title: val.title,
                vals: [] as Vals
            }
            for (const valKey in val.values) {
                obj.vals.push({
                    key: valKey,
                    value: val.values[valKey],
                });
            }
            list.push(obj);
        }
        // list.push({
        //     name:"tag",
        //     title:"标签",
        //     vals: [] as string[],
        // })
        // const tagObj = list.filter(t => t.name === 'tag')[0]
        // for (let itemVal of props.db.list) {
        //     if(itemVal.tag){
        //         tagObj.vals = [...new Set([...tagObj.vals, ...itemVal.tag])]
        //     }
        // }
        return list
    }, [props.map])


    /**
     * 当前激活项clas初始化
     */
    const clasInit = () => {
        // 遍历map
        const temp = {};
        classifyMap.forEach(t => {
            // @ts-ignore
            temp[t.name] = "all";
            // 看看query参数有没有同名的, 有的话覆盖
            // @ts-ignore
            router.query[t.name] && (temp[t.name] = router.query[t.name]);
        })
        return temp as ClasType
    }
    /**
     * 当前激活的筛选项
     */
    const [clas, setClas] = useState<ClasType>(clasInit())

    /**
     * 子组件点击修改事件
     * @param item
     */
    const onChange = (item: ClasType) => {
        setClas((prevState) => {
            return {...prevState, ...item};
        })
    }

    /**
     * 全部资源数据
     * */
    const [db, setDb] = useState(props.db)

    /**
     * 获取网站的icon */
    function getIcon(url: string) {
        // const __LINK__ = "https://www.favicon.vip/get.php?url=";
        const __LINK__ = "http://icon.hhpp.net/get.php?url=";
        return `${__LINK__}${url}`
    }

    // TODO: 网络图片加载失败, 替换成本地"错误"图片 -功能
    const handleImgLoadError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.src = imgError.src;
    }

    // TODO 搜索功能
    // 正在搜索中 -stata
    const [isSearching, setSearching] = useState({value: false});
    // 搜索结果 -stata
    const [searchRes, setSearchRes] = useState<DbT["list"]>([]);
    // 搜索框内容 -stata
    const [value, setValue] = useState('')
    // 去搜索 -函数
    function toSearch(key: string){
        if(key.trim()){ // 有值, 去搜索
            setSearching({
                value: true
            }) // 正在搜索ing
            const res = search(key, props.db.list)
            setSearchRes(res)
            console.log("断点", res);
        }else{
            setSearching({
                value: false
            }); // 取消搜索
            setSearchRes([]) // 清空搜索结果
        }
    }


    // TODO: 动态计算宽度, 设置p元素宽度 -功能
    const [w, setW] = useState('98px')
    function getWidth(){
        const a = document.querySelector('a.resource_box') as HTMLAnchorElement;
        if(!a){
            return
        }
        const infoEl = a.querySelector('.resource_info') as HTMLDivElement;;
        setW(infoEl.getBoundingClientRect().width -8 + 'px')
    }
    // 组件挂载之后执行
    useEffect(()=>{
        window.addEventListener('resize', temp) // 监听
        // 设置节流
        let time = 800; // 500ms
        let bool = true;
        function temp(){
            if(bool){
                bool = false;
                const timer = setTimeout(() => {
                    getWidth()
                    bool = true;
                    timer && clearTimeout(timer)
                }, time)
            }
        }
        getWidth()
    },[])

    /**
     * 筛选之后的结果
     * */
    const res = useMemo(() => {
        // 正在搜索ing???
        if(isSearching.value){
            return searchRes
        }
        // 全部数据
        let list = db.list;
        const resList = list.filter(item => {
            // 筛选符合条件的项目
            return _filter(item)
        })

        /**筛选函数, 判断通过则符合筛选结果 */
        function _filter(item: DbT["list"][number]) {
            // let tempBool = false;
            const clasArray: string[] = [];
            const allList = []
            for (let clasKey in clas) {
                // @ts-ignore
                const clasVal = clas[clasKey];
                allList.push(`${clasKey}-all`);
                clasArray.push(`${clasKey}-${clasVal}`)
            }
            const newTypeList = [...item.type, ...allList];

            let through = 0;
            for (let str of clasArray) {
                newTypeList.includes(str) && through++;
            }
            if(through === clasArray.length){
                return true;
            }else{
                return false;
            }
        }

        return resList
    }, [db, clas, isSearching])

    // db数据列表渲染的item,res中是否有该项
    const hasRes = (name: string) => {
        return res.find(t => t.name === name);
    }

    // TODO: 弹出框功能
    const [ show, setShow ] = useState(false); // 是否显示popup
    const [popupData, setPopupData] = useState<PopupData>();
    /**
     * 点击a标签事件
     */
    const clickHandle = (e: React.MouseEvent, name: string) => {
        e.preventDefault(); // 先阻止默认跳转事件
        const data = props.db.list.filter(item => item.name === name)[0]
        var isDetailsPath = false;
        if (props.paths.map(t => t.toLowerCase()).includes(data.name.toLowerCase())) {
            // 没有详情地址
            isDetailsPath = true
        }
        setPopupData({...data, isDetailsPath}); // 获取点击项的数据
        setShow(true);
    }

    return (
        <div className={sty.root}>
            <NavigationBar className={sty.nav_bar} navData={props.navData}></NavigationBar>
            <div className={sty.classify}>
                <ClassifyScreening onChange={onChange} clas={clas} classifyMap={classifyMap}></ClassifyScreening>
                {/*搜索框*/}
                {classifySearchBox({onChange: toSearch})}
                {/*内容栏*/}
                <section>
                    {
                        db.list.map(t => {
                            return <a key={t.name}
                                      title={t.info + '\n' +'标签：'+ t?.tag?.toString() }
                                      href={`/details/${t.name}`}
                                      target="_blank"
                                      data-source={t.url}
                                      onClick={(e) => clickHandle(e, t.name)}
                                      className={`${sty.item} ${hasRes(t.name) || sty.item_hide} transition resource_box`}>
                                <div className={sty.cover}>
                                    <img onError={handleImgLoadError} src={t.ico} alt="logo"/>
                                </div>
                                <div className={sty.info + ' resource_info'}>
                                    <span className={sty.item_title}>{t.name}</span>
                                    <p style={{'maxWidth': w}}>{t.info}</p>
                                </div>
                            </a>
                        })
                    }

                </section>
            </div>
            <Popup show={show} data={popupData} onClose={() => {setShow(false)}}></Popup>
        </div>
    );
}

// 静态渲染
export async function getStaticProps() {
    const paths = getDetailsPaths();
    const data = await import('../static/nav.json') as { default: NavT };
    // 筛选类型-map映射文件
    const classifyMap = await import('../static/map.json') as { default: MapJsonT };
    const {default: db} = await import('../static/db.json') as { default: DbT };
    return {
        props: {
            navData: data.default,
            map: classifyMap.default,
            db,
            paths,
        }
    }
}
