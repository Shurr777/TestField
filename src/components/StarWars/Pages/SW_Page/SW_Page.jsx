import React, {useEffect} from 'react';
import s from './SW_Page.module.css'
import Preloader from "../../../Preloader/Preloader";

const SW_Page = ({resources, lnk, isLoading, getPageThunkCreator, getNewPageThunkCreator}) => {

    useEffect(() => {
        getPageThunkCreator(lnk)
    }, [lnk]);

    /**
     *
     * @param link - link to Previous page
     */
    const onPreviousClick = (link) => {
        if(link) getNewPageThunkCreator(link)
    }
    /**
     *
     * @param link - link to Next page
     */
    const onNextClick = (link) => {
        if(link) getNewPageThunkCreator(link)
    }

    return (
        <div>
            {isLoading ? <Preloader/> :
                <div >
                    <div className={s.paginationMenu}>
                        <button className={resources.previous ? `${s.active}` : `${s.passive}`}
                            onClick={() => {onPreviousClick(resources.previous)}}>
                            Previous
                        </button>
                        <button className={resources.next ? `${s.active}` : `${s.passive}`}
                            onClick={() => {onNextClick(resources.next)}}>
                            Next
                        </button>
                    </div>
                    <div className={s.pageOverlay}>
                        {resources.results.map((el) => {
                            return (
                                <div key={el.name} className={s.itemBlockOverlay}>
                                    {Object.entries(el).map((e) => {
                                        if(typeof e[1] === 'string') {
                                            return (
                                                <div className={s.item} key={e[0]}>
                                                    <div className={s.itemName}>{e[0]}</div>
                                                    <div className={s.itemValue}>{e[1]}</div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
};

export default SW_Page;