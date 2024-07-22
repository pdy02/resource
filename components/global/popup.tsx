import React, {useEffect} from 'react';
import sty from './cssModules/popup.module.css'
import Link from "next/link";
import { PopupData } from "../../types";
import imgError from '../../public/images/img-failure.svg'

interface Props {
    show: boolean
    data: PopupData | undefined
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
        }else{
            body.classList.remove('no_scroll')
        }
    }, [show]);

    const clickPopupHandle = (e: React.MouseEvent) => {
        if(e.target === e.currentTarget){
            closeHandle()
        }
    }

    const onImgErrorHandle = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.target as HTMLImageElement;
        img.src = imgError.src
    }
    return (
        <>
            <div onClick={clickPopupHandle} className={`${sty.popup} ${show ? sty.show : sty.hide}`}>
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
                            <img onError={onImgErrorHandle} src={data.ico} alt="logo"/>
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
                                {
                                    data.isDetailsPath && <Link target="_blank" href={`/details/${data.name}`}>
                                        详情页面
                                    </Link>
                                }
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
