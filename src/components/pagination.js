import React from 'react';
import '../App.css'
require('../css/pagination.css')
const Pagination = (props) => {
    let { currentPage, handleNavigationClick, postsPerPage, handleSelectPage, totalPosts, first, last, currentNoOfPosts } = props;
    var leftButtonClasses = [];
    var rightButtonClasses = [];
    console.log(currentPage)
    if (first == 0) {
        leftButtonClasses = ['page_button', 'disable_button']
    } else {
        leftButtonClasses = ['page_button']
    }
    if (currentNoOfPosts < postsPerPage) {
        rightButtonClasses = ['page_button', 'disable_button']
    } else {
        rightButtonClasses = ['page_button']
    }

    return (
        <div className='pagination_wrapper'>
            <div className='rows_per_page'>
                <p>Rows per page:</p>
                <select onChange={handleSelectPage}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </div>
            <div className='pageCount'>
                {first} - {last} of {totalPosts}
            </div>

            <ul>

                <button className={leftButtonClasses.join(' ')} onClick={() => handleNavigationClick(currentPage - 1)}><i class="fas fa-chevron-left"></i></button>
                <button className={rightButtonClasses.join(' ')} onClick={() => handleNavigationClick(currentPage + 1)}><i class="fas fa-chevron-right"></i></button>
            </ul>
        </div>
    )
}

export default Pagination;