import React from 'react';
import sty from './homeNavMobile.module.css'

function HomeNavMobile(props) {
    // const showDrop = (e) => {
    //     console.log("e: ",e);
    //     console.log("this: ",this);
    // }
    function showDrop (e) {
        console.log("e: ",e.currentTarget);
        const target = e.currentTarget;
        const __KEY__ = 'show';
        target.dataset[__KEY__] = target.dataset[__KEY__] === 'false'? 'true': 'false';
    }
    return (
        <div className={sty.container}>
            <nav className={sty.menu}>
                {
                    props.list.map(item => {
                        return !item.child ?
                            <a href={item.href || '#'} key={item.title}>{item.title}</a> :
                            <div key={item.title}>
                                <button data-show={false} onClick={showDrop}>
                                    <span>{item.title}</span>
                                    <span className={`iconfont icon-z043`}></span>
                                </button>
                                <div className={sty.menu_drop}>
                                    {
                                        item.child.map(group => {
                                            return <section key={group.group_title}>
                                                {group.group_title && <span>{group.group_title}</span>}
                                                {
                                                    group.list.map(g => {
                                                        return <a key={g.name} href={g.href || '#'}>{g.name}</a>
                                                    })
                                                }
                                            </section>
                                        })
                                    }
                                </div>
                            </div>
                    })
                }
            </nav>
        </div>
    );
}

export default HomeNavMobile;