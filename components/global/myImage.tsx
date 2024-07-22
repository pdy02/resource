import  React from 'react';
import sty from './cssModules/myImage.module.css'
import img_loading from '../../public/images/img-loading.svg'
import img_error from '../../public/images/img-failure.svg'

interface Props{
    src: string
}
function myImage({src}: Props) {
    console.log("图片导入:　",img_loading);
    const loadImg = () => {
        // fetch(src).then(res => res)
    }

    const errorImgHandle = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const el = e.target as HTMLImageElement;
        el.src = img_error.src
        el.style.backgroundImage = `none`
    }
    return (
        <>
            <div className={sty.container}>
                <img loading={'lazy'} src={src}
                     data-src={src}
                     onError={errorImgHandle}
                     alt="logo"
                />
            </div>
        </>
    )
}

export default myImage
