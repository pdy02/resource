import React from 'react';
import homeStyle from "../styles/modules/home.module.css";
import NavigationBar from "../components/global/navigationBar";


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
                            <a href="/classification?sys=all&com=all" className={`${homeStyle.start_btn}`}>开始探索</a>
                        </p>
                    </div>
                    <div className={`${homeStyle.main_img}`}>
                        <img loading={"lazy"} data-src="./images/home.png" src="./images/home.png" alt="首页主题图片"/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Index;

export async function getStaticProps() {
    // 获取数据，例如从 JSON 文件、API 或其他源
    // const data = await import('../static/db.json');
    const navData = await import('../static/nav.json');

    // 返回对象必须包含 props，这些 props 将作为参数传递给页面组件
    return {
        props: {
            navData: navData.default as NavT
        },
    };
}

