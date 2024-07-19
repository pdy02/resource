import React, {useEffect} from 'react';
import sty from './cssModules/popup.module.css'
import Link from "next/link";


interface Props {
    show: boolean
    data: DbT["list"][number] | undefined
    onClose: () => void
}
function popup({show,data, onClose}: Props) {
    // 关闭事件
    const closeHandle = () => {
        onClose()
    }
    useEffect(() => {
        const body = document.body as HTMLBodyElement;
        if(show){
            // 打开, 禁止滚动
            body.classList.add('no_scroll')
            // body.addEventListener('mousemove')
        }else{
            body.classList.remove('no_scroll')
        }
    }, [show]);
    return (
        <>
            <div className={`${sty.popup} ${show ? sty.show : sty.hide}`}>
                {
                    data && <div className={`${sty.container}`}>
                        {/*关闭按钮*/}
                        <div className={sty.shutDownBtn}
                             title="关闭"
                             onClick={closeHandle}
                        >
                            <span className={`iconfont icon-guanbi`}></span>
                        </div>
                        <header className={`${sty.head}`}>
                            <img src={data.ico} alt="logo"/>
                            <span>{data.name}</span>
                        </header>
                        <main>
                            {
                                data.tag?.length && <p className={sty.tagBox}>
                                    <span>标签：</span>
                                    {
                                        data.tag.map(tag => <span key={tag}>{tag}</span>)
                                    }
                                </p>
                            }
                            <p className={sty.links}>
                                <Link target="_blank" href={`/details/${data.name}`}>
                                    详情页面
                                </Link>
                                <Link target="_blank" href={`${data.url}`}>
                                    官方地址
                                </Link>
                            </p>
                            <p className={sty.info}>{data.info}</p>
                        </main>
                    </div>
                }
            </div>
        </>
    )
}

export default popup
