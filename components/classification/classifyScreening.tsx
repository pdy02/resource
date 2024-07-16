// 筛选组件
import React, {useCallback} from 'react';
import sty from './screening.module.css'
import { ClasType } from "../../pages/classification";

interface PropsT {
    onChange: (item: ClasType) => void;
    classifyMap: any[];
    clas: { [x: string]: any; };
}

function ClassifyScreening(props: PropsT) {
    // const get
    const onHandleClickToggle = useCallback((e: React.MouseEvent) => {
        // console.log("e: ",e.target)
        const target = e.target as HTMLElement;
        if (target.tagName === 'SPAN') {
            const key = (target.parentNode!.parentNode! as HTMLElement).dataset.key ?? '';
            const val = target.dataset.val ?? '';
            props.onChange({[key]: val} as ClasType)
        }
    }, [])
    return (
        <div className={sty.screening}>
            {
                props.classifyMap.map(t => <div key={t.title} data-key={t.name} className={sty.level_item}>
                    <span className='bold'>{t.title}</span>
                    <section className={sty.level_item_value} onClick={onHandleClickToggle}>
                        <span data-val="all" className={props.clas[t.name] === 'all' ? sty.active : ''}>全部</span>
                        {t.vals.map((v: {
                            key: string;
                            value: string
                        }) => <span data-val={v.key}
                                    key={v.key}
                                    className={props.clas[t.name] === v.key ? sty.active : ''}
                        >{v.value}</span>)}
                    </section>
                </div>)
            }
        </div>
    );
}

export default ClassifyScreening;