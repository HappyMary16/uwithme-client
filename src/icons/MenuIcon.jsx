import React from "react";

export function MenuIcon({onClick}) {
  return (
    <div onClick={onClick} className={"icon menu-icon"}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        height='30px'
        viewBox="0 0 192 192"
        preserveAspectRatio="xMidYMid meet"
        className="st1"
      >
        <path
          d="M172.3,115.5H21.8c-9.6,0-17.3-7.8-17.3-17.3v-2.8c0-9.6,7.8-17.3,17.3-17.3h150.4c9.6,0,17.3,7.8,17.3,17.3
	v2.8C189.6,107.8,181.8,115.5,172.3,115.5z"
        />
        <path
          d="M172.3,176.3H21.8c-9.6,0-17.3-7.8-17.3-17.3v-2.8c0-9.6,7.8-17.3,17.3-17.3h150.4c9.6,0,17.3,7.8,17.3,17.3
	v2.8C189.6,168.5,181.8,176.3,172.3,176.3z"
        />
        <path
          d="M172.3,54.8H21.8c-9.6,0-17.3-7.8-17.3-17.3v-2.8c0-9.6,7.8-17.3,17.3-17.3h150.4c9.6,0,17.3,7.8,17.3,17.3v2.8
	C189.6,47.1,181.8,54.8,172.3,54.8z"
        />
      </svg>
    </div>
  );
}
