import React, {useState} from 'react';
import './Header.css'
import arrow from '../../public/icons/user-arrow.svg'
import avatar from '../../public/icons/user-avatar.svg'

export const Header = () => {
    const [hideMenu, setHideMenu] = useState(false);
    const [arrowRot, setarrowRot] = useState('arrow');
    return (
        <header>
            <div className="header-wrapper">
                <div className="header-name">Awesome Kanban Board</div>
                <div className="user-main" onClick={() => {
                    hideMenu ? setHideMenu(false) : setHideMenu(true);
                    arrowRot === 'arrow' ? setarrowRot('arrow arrow-rotate') : setarrowRot('arrow');
                }}>
                    <img className="user" src={avatar} alt="user"></img>
                    <img className={arrowRot} src={arrow} alt="arrow"></img>
                </div>
                {hideMenu && <div className="user-menu">
                <ul className="usermenu-list">
                    <li>Profile</li>
                    <li>LogOut</li>
                </ul>
            </div>}
            </div>
        </header>
    )
}