// @ts-ignore
import React from 'react';
import {usePagination, DOTS} from "../../../hooks/usePagination";
// @ts-ignore
import style from "./pagination.module.css"

type Props = {
    onPageChanged: (page: number)=>void,
    totalUsersCount: number,
    siblingCount: number,
    currentPage: number,
    pageSize?: number,
}

const Paginator: React.FC<Props> = props => {
    const {
        onPageChanged,
        totalUsersCount,
        siblingCount = 10,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalUsersCount,
        siblingCount,
        pageSize
    });

    let lastPage = paginationRange[paginationRange.length - 1];

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
    const onNext = () =>{
    if (currentPage !== lastPage)
        onPageChanged(currentPage + 1);
    };

    const onPrevious = () => {
        if (currentPage !== 1)
        onPageChanged(currentPage - 1);
    };

    return (
        <ul
            className={style.paginationContainer}
        >
            {/* Left navigation arrow */}
            <li
                className={style.paginationItem}
                onClick={onPrevious}
            >
                <div className={`${style.arrow} ${style.left}`}/>
            </li>
            {paginationRange.map((pageNumber, index) => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li className={`${style.paginationItem}${style.dots}`}
                               key={index}
                    >
                        &#8230;
                    </li>
                }

                // Render our Page Pills
                return (
                    <li
                        className={currentPage === pageNumber
                            ? style.paginationItemSelected
                            : style.paginationItem
                        }
                        onClick={() => onPageChanged(pageNumber)}
                        key={index}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li className={style.paginationItem}
                onClick={onNext}
            >
                <div className={`${style.arrow} ${style.right}`}/>
            </li>
        </ul>
    );
};

export default Paginator;



