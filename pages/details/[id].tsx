import React, {useEffect} from 'react';
import NavigationBar from '../../components/global/navigationBar';
import sty from '../../styles/modules/detailes.module.css'
import {GetStaticProps} from 'next'
import * as fs from "node:fs";
import path from "node:path";

interface Porps {
    navData: NavT
    res: DetailsT
}
export default function id(props: Porps) {
    useEffect(() => {
        const __MAX__ = 2000; // ms
        // 获取所有链接元素
        const list = document.querySelectorAll(`.${sty.list_resource_item} > a`);
        const ctn = document.createElement('span');
        ctn.style.visibility = 'hidden'; // 不可见
        document.body.appendChild(ctn);
        for (let listElement of list) {
            ctn.innerText = listElement.innerHTML;
            const s = ctn.offsetWidth > __MAX__ ? __MAX__ : ctn.offsetWidth;
            (listElement as HTMLSpanElement).style.setProperty('--ms', s +'ms');
        }
        ctn.remove(); // 移除dom
    }, []);
    return (
        <>
            <NavigationBar navData={props.navData}></NavigationBar>
            <div className={`${sty.container} container`}>
                <h1 className={`${sty.h1}`}>
                    <img loading={"lazy"} width="50px" height="50px" src={props.res.ico} alt="logo"/>
                    <span>
                        {props.res.title}
                    </span>
                </h1>
                <section>
                    <h2 className={`${sty.box_title} ${sty.title}`}>介绍</h2>
                    <p className={`${sty.ctn}`}>
                        {props.res.info}
                    </p>
                </section>
                {props.res.adv && <section>
                    <h2 className={`${sty.title}`}>🙆‍♂️💖<span>优点:</span></h2>
                    <ul className={`${sty.list}`}>
                        {
                            props.res.adv.map((item, index) => {
                                return <li className={`${sty.list_item}`} key={index}>{item}</li>
                            })
                        }
                    </ul>
                </section>}
                {props.res.dis && <section>
                    <h2 className={`${sty.title}`}>🤷‍♂️❌<span>缺点:</span></h2>
                    <ul className={`${sty.list}`}>
                        {
                            props.res.dis.map((item, index) => {
                                return <li className={`${sty.list_item}`} key={index}>{item}</li>
                            })
                        }
                    </ul>
                </section>}

                <section>
                    <h2 className={`${sty.title}`}>资源链接</h2>
                    <ul className={`${sty.list}`}>
                        {
                            props.res.resource_link && props.res.resource_link.map(link => {
                                return <li key={link[0]} className={`${sty.list_resource_item}`}>
                                    <span>{link[0]}</span>
                                    <a href={link[1]} target="_blank">{link[1]}</a>
                                </li>
                            })
                        }
                    </ul>
                </section>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const DOCS_PATH = path.resolve(process.cwd(), `./static/docs`);
    const files = fs.readdirSync(DOCS_PATH);
    // __dirname D:\Development\Store\resource_tools\ssg\nextjs-blog\.next\server\pages\details
    // cwd: D:\Development\Store\resource_tools\ssg\nextjs-blog
    const resList = files.map(file => {
        // console.log(path.extname(path.join(DOCS_PATH, file)));
        if(path.extname(path.join(DOCS_PATH, file)) === '.json'){
            return file.slice(0,-5)
        }
    })
    console.log(resList)
    console.log("cwd:　", files)
    const posts = resList;
    //     [
    //     "vue","开源阅读","omoFun","异次元","源仓库","网飞猫","Tvbox","LocalSend"
    // ]

    const paths = posts.map((post) => ({
        params: { id: post },
    }))

    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const data = await import('../../static/nav.json') as { default: NavT };
    const res = await import(`../../static/docs/${params!.id}.json`) as { default: DetailsT };

    return {
        props: {
            navData: data.default,
            res: res.default
        }
    }
}


// export const getServerSideProps:　GetServerSideProps = async ({query}) => {
//     console.log("query: ", query);
//     if (!query.id){
//         return {
//             notFound: true
//         }
//     }
//     const nav = await fetch(process.env.BASE_URL + '/static/nav.json');
//     let resJson;
//     let pall;
//     try{
//         resJson = await fetch(`${process.env.BASE_URL}/static/docs/${(query.id as string).toLowerCase()}.json`);
//         pall = await Promise.all([nav.json(), resJson.json()]) as unknown as [ NavT, DetailsT ];
//     }catch(error){
//         console.log("加载页面数据错误: ", error);
//         return {
//             notFound: true
//         }
//     }
//
//     const [ navData, res ] = pall;
//
//     return {
//         notFound: !res,
//         props: {
//             navData,
//             res
//         }
//     }
// }