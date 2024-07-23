import React from 'react';
import homeStyle from "../styles/modules/home.module.css";
import NavigationBar from "../components/global/navigationBar";
import Link from "next/link";
import type { Metadata } from "next";

function Index(props: {navData: NavT}) {
    return (
        <>
            <NavigationBar navData={props.navData}></NavigationBar>
            {/*内容区*/}
            <main className={`${homeStyle.main}`}>
                <section className={`${homeStyle.main_introduction}`}>
                    <div className={`${homeStyle.main_info}`}>
                        <h1>探索更有趣的应用和网站</h1>
                        <p>
                            <Link href="/classification?sys=all&com=all" className={`${homeStyle.start_btn}`}>
                                开始探索
                            </Link>
                        </p>
                    </div>
                    <div className={`${homeStyle.main_img}`}>
                        <img loading={"lazy"}
                             data-src="./images/home.png"
                             src="./images/home.png"
                             alt="首页主题图片"/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Index;

export async function getStaticProps() {
    const navData = await import('../static/nav.json');

    return {
        props: {
            navData: navData.default as NavT
        },
    };
}

// 导出元信息
export const metadata: Metadata = {
    title: "Dy-Collect 首页"
}