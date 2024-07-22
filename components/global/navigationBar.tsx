import React, {useMemo, useState} from 'react';
import HomeNavMobile from "../home/homeNavMobile";
import sty from './cssModules/navigationBar.module.css'
import Link from 'next/link'
import {switchBodyScroll} from "../../utils";

interface IProps {
    navData: NavT
    className: string
}
// 导航栏组件
function NavigationBar(props: IProps) {

    // 是否展开导航栏 -移动端
    const [isShow, setIsShow ] = useState(false);

    const iconByIsShow = useMemo(() => {
        return isShow ?  'icon-guanbi' :'icon-zhankai'
    }, [isShow]);

    function handleClickShow() {
        setIsShow((prevState) => {
            const cur = !prevState;
            switchBodyScroll(cur);// 禁止/允许滚动
            return cur;
        })
    }

    return (
        <>
        <header className={`${sty.top_layer} ${props.className && props.className}`}>
            {/*搜索栏*/}
            <div className={sty.head}>
                <div className={`${sty.logo} logo`}>
                    <span className={`iconfont icon-tools`}></span>
                    <Link href="/">
                        <span>DY-Collect</span>
                    </Link>
                </div>
                {/*右侧*/}
                <div className={`${sty.container}`}>
                    <nav className={sty.links + ' flex'}>
                        {
                            props.navData.map((item) => {
                                return !item.child?.length ?
                                    <a className='transition' key={item.title} href={'#'}>{item.title}</a> :
                                    <div key={item.title}>
                                        <button className='transition' type={"button"}>
                                            {item.title}
                                            <span className={`iconfont icon-z043 transition`}></span>
                                        </button>
                                        <div key={item.title}  className={sty.links_hide}>
                                            {
                                                item.child.map((group ,index) => {
                                                    return <section className='transition' key={index}>
                                                        {
                                                            group.group_title && <span>{group.group_title}</span>
                                                        }
                                                        {
                                                            group.list.map(itm => <a className='transition' key={itm.name}
                                                                                     href={itm.href || '#'}>{itm.name}</a>)
                                                        }
                                                    </section>
                                                })
                                            }
                                        </div>
                                    </div>
                            })
                        }
                    </nav>
                    <div className={`${sty.brand}`}>
                        <a href="https://github.com/pdy02/resource" target="_blank">
                            <span className={`iconfont icon-github-fill ${sty['logo-icon']}`}></span>
                        </a>
                        <span
                            onClick={handleClickShow}
                            className={`iconfont ${iconByIsShow} ${sty.mobile_icon} ${sty['logo-icon']}`}></span>
                    </div>
                </div>
            </div>
        </header>
            {/*移动端的nav栏*/}
            {
                isShow && <HomeNavMobile list={props.navData}></HomeNavMobile>
            }
        </>
    );
}

export default NavigationBar;