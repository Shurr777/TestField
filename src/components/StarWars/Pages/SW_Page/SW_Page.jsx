import React, {useEffect} from 'react';
import s from './SW_Page.module.css'

const SW_Page = ({lnk, pages, getPageThunkCreator}) => {
    console.log('link', lnk)
    console.log('pages', pages)

    useEffect(() => {
        getPageThunkCreator(lnk)
    }, [lnk]);

    return (
        <div className={s.pageOverlay}>
            {Object.keys(pages).map(el => {
                /*console.log('el key', el, 'el value', pages[el].name);*/
                return (
                    <div className={s.itemBlockOverlay} key={el}>
                        {Object.keys(pages[el]).map(elem => {
                            /* console.log('elem key', elem, 'el value', pages[el][elem]);*/
                            if (typeof pages[el][elem] === 'string')
                                return (
                                    <div className={s.item} key={elem}>
                                        <div className={s.itemName}>
                                            {elem}:
                                        </div>
                                        <div className={s.itemValue}>
                                            {pages[el][elem]}
                                        </div>
                                    </div>
                                )
                        })}
                    </div>
                )
            })}
        </div>
    )
};

export default SW_Page;