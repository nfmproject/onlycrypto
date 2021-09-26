import React from 'react';
import './SidebarOption.css';

function SidebarOption(props: {
  active: boolean;
  text: string;
  inactiveIcon: any;
  activeIcon: any;
  handleOnClick: any;
}) {
  function isActive() {
    return <props.activeIcon />;
  }
  function isNotActive() {
    return <props.inactiveIcon />;
  }
  return (
    <div
      className={`sidebarOption ${props.active && 'sidebarActive'}`}
      onClick={() => props.handleOnClick(props.text)}
    >
      {props.active ? isActive() : isNotActive()}
      <h2>{props.text}</h2>
    </div>
  );
}
export { SidebarOption };
