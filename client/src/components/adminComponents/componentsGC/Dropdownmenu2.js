import React, { useState } from 'react';
import { MenuItemsacquis } from './MenuItems';
import { Link } from 'react-router-dom';
import './Dropdown.css';

function Dropdownmenu2() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItemsacquis.map((item, index) => {
          return (
            
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default Dropdownmenu2;