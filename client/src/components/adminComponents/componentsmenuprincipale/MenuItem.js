import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";

/**
 * @author
 * @function MenuItem
 **/

const MenuItem = (props) => {
  const { name, subMenus,subMenu, iconClassName, onClick, to, exact } = props;
  const [expand, setExpand] = useState(false);
  
  const onTrigger = (data) => {
    props.grandParentCallback(data);
}

  return (
    <li onClick={props.onClick}>
      <a
        onClick={() => {
           setExpand((e) => !e);
         }}
        className={`menu-item`}
      >
        <div className="menu-icon">
          <i class={iconClassName}></i>
        </div>
        <span>{name}</span>
      </a>
      {subMenus && subMenus.length > 0 ? (
        <ul className={`sub-menu`}>
          {subMenus.map((menu, index) => (
            <li key={index}>
              <a>{menu.name}</a>
              {/*<NavLink to={menu.to} onClick={props.onClick}> {menu.name}</NavLink>*/}
            </li>
          ))}
        </ul>
      ) : null}

</li>
  );
};

export default MenuItem;
