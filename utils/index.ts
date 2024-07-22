/**
 * 禁止body滚动, 根据bol变量
 * @param bol
 */
export const switchBodyScroll = (bol: boolean) => {
    const bd = document.body;
    if(bol){
        bd.classList.add("no_scroll")
    }else{
        bd.classList.remove("no_scroll")
    }
}

export * from './search'