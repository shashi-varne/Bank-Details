import React from 'react';
import '../App.css';
import { useState } from 'react';
import Pagination from '../components/pagination';
require('../css/bank.css');

const BankData = (props) => {

    let { bankDetails, handleCityChange, handleCategoryChange, postsPerPage, filteredData, handleInputChange, indexOfFirstPost, indexOfLastPost, currentPage, handleNavigationClick, handleSelectPage } = props;

    return (
        <div className='main_content_page'>
            <div className='bank_title_bar'>
                <p>BANKS</p>
                <div className='search_tools'>
                    <select class="empty bank_cities" onChange={handleCityChange}>
                        <option value="" selected disabled>Select City</option>
                        <option value="BANGALORE">Bangalore</option>
                        <option value="HYDERABAD">Hyderabad</option>
                        <option value="DELHI">Delhi</option>
                        <option value="CHENNAI">Chennai</option>
                        <option value="MUMBAI">Mumbai</option>
                    </select>

                    <select class="empty bank_category search_tools_item" onChange={handleCategoryChange}>
                        <option value="" selected disabled>Select Category</option>
                        <option value="ifsc">IFSC</option>
                        <option value="bank_id">Bank ID</option>
                        <option value="branch">Branch</option>
                        <option value="address">Address</option>
                        <option value="bank_name">Bank Name</option>
                    </select>
                    <div className='search_container'>
                        <input type="text"
                            placeholder=""
                            name="search"
                            autoComplete='off'
                            className='search_input search_tools_item'
                            onChange={handleInputChange}
                        />
                        <i class="fas fa-search"></i>
                    </div>
                </div>
            </div>
            <div className='bank_titles'>
                <p className='flex_item_0'></p>
                <p className='flex_item_1'>BANKS</p>
                <p className='flex_item_2'>IFSC</p>
                <p className='flex_item_3'>BRANCH</p>
                <p className='flex_item_4'>Bank ID</p>
                <p className='flex_item_5'>Address</p>
            </div>
            <div className='bank_content'>
                {
                    bankDetails.map(bank => (
                        <p>
                            <span className='flex_item_0'><i class="far fa-star"></i></span>
                            <span className='flex_item_1'>{bank.bank_name}</span>
                            <span className='flex_item_2'>{bank.ifsc}</span>
                            <span className='flex_item_3'>{bank.branch}</span>
                            <span className='flex_item_4'>{bank.bank_id}</span>
                            <span className='flex_item_5'>{bank.address.substring(0, 50)}</span>
                        </p>
                    ))
                }
            </div>
            <Pagination currentPage={currentPage}
                handleNavigationClick={handleNavigationClick}
                handleSelectPage={handleSelectPage}
                totalPosts={filteredData.length}
                first={indexOfFirstPost} last={indexOfLastPost}
                currentNoOfPosts={bankDetails.length}
                postsPerPage={postsPerPage} />

        </div>
    )
}

export default BankData;