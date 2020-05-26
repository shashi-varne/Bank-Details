import React, { Component } from 'react';
require('../css/navbar.css');

export default class navBar extends Component {
    render() {
        return (
            <div>

                <nav className='side_nav'>
                    <div className='side_nav_header'>
                        <li className='list_item'>
                            <i class="fas fa-university"></i>Banks<span className='triangle-left'></span>
                        </li>
                    </div>

                </nav>
            </div>
        )
    }
}
