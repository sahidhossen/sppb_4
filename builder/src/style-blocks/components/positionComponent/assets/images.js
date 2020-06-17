import React from "react";

const Images = {
  static: (
    <svg width="209" height="100" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(1 1)" fill="none" fillRule="evenodd">
        <rect stroke="#FF9391" fill="#FD6260" strokeLinecap="round" width="72" height="44" rx="3" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="82.5" y=".5" width="125" height="8" rx="4" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="82.5" y="18.5" width="125" height="8" rx="4" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="82.5" y="36.5" width="125" height="8" rx="4" />
        <rect stroke="#8095FF" fill="#4E5EDA" x=".5" y="54.5" width="207" height="8" rx="4" />
        <rect stroke="#8095FF" fill="#4E5EDA" x=".5" y="72.5" width="207" height="8" rx="4" />
        <rect stroke="#8095FF" fill="#4E5EDA" x=".5" y="90.5" width="207" height="8" rx="4" />
      </g>
    </svg>
  ),
  relative: (
    <svg width="218" height="141" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path stroke="#707785" strokeWidth="2" fill="#2A2C36" d="M6 5h206v132H6z" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="59.5" y="94.5" width="99" height="24" rx="3" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="59.5" y="24.5" width="99" height="24" rx="3" />
        <rect stroke="#FF9391" fill="#FD6260" strokeLinecap="round" x="66" y="12" width="100" height="25" rx="3" />
        <circle stroke="#7E8897" fill="#1D2027" cx="213" cy="5" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="213" cy="136" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="5" cy="136" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="5" cy="5" r="4.5" />
        <path
          d="M62 59h94a3 3 0 013 3v19a3 3 0 01-3 3H62a3 3 0 01-3-3V62a3 3 0 013-3zM66.5 12.5L59 59M164.5 35.5L159 84"
          stroke="#FD812B"
          strokeLinecap="round"
          strokeDasharray="6"
        />
      </g>
    </svg>
  ),
  fixed: (
    <svg width="218" height="141" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path stroke="#707785" strokeWidth="2" fill="#2A2C36" d="M6 5h206v132H6z" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="59.5" y="94.5" width="99" height="24" rx="3" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="59.5" y="24.5" width="99" height="24" rx="3" />
        <rect stroke="#FF9391" fill="#FD6260" strokeLinecap="round" x="19" y="38" width="180" height="25" rx="3" />
        <circle stroke="#7E8897" fill="#1D2027" cx="213" cy="5" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="213" cy="136" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="5" cy="136" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="5" cy="5" r="4.5" />
        <rect
          stroke="#8095FF"
          strokeWidth=".3"
          fill="#2A2C36"
          x="203.15"
          y="10.15"
          width="4.7"
          height="120.7"
          rx="2.35"
        />
        <rect fill="#4E5EDA" x="204" y="49" width="3" height="43" rx="1.5" />
      </g>
    </svg>
  ),
  sticky: (
    <svg width="218" height="141" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path stroke="#707785" strokeWidth="2" fill="#2A2C36" d="M6 5h206v132H6z" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="59.5" y="59.5" width="99" height="24" rx="3" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="59.5" y="94.5" width="99" height="24" rx="3" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="59.5" y="24.5" width="99" height="24" rx="3" />
        <rect stroke="#FF9391" fill="#FD6260" strokeLinecap="round" x="19" y="12" width="180" height="25" rx="3" />
        <circle stroke="#7E8897" fill="#1D2027" cx="213" cy="5" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="213" cy="136" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="5" cy="136" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="5" cy="5" r="4.5" />
        <rect
          stroke="#8095FF"
          strokeWidth=".3"
          fill="#2A2C36"
          x="203.15"
          y="10.15"
          width="4.7"
          height="120.7"
          rx="2.35"
        />
        <rect fill="#4E5EDA" x="204" y="49" width="3" height="43" rx="1.5" />
      </g>
    </svg>
  ),
  absolute: (
    <svg width="218" height="141" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path stroke="#707785" strokeWidth="2" fill="#2A2C36" d="M6 5h206v132H6z" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="59.5" y="94.5" width="99" height="24" rx="3" />
        <rect stroke="#8095FF" fill="#4E5EDA" x="59.5" y="24.5" width="99" height="24" rx="3" />
        <rect stroke="#FF9391" fill="#FD6260" strokeLinecap="round" x="111" y="6" width="100" height="25" rx="3" />
        <circle stroke="#7E8897" fill="#1D2027" cx="213" cy="5" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="213" cy="136" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="5" cy="136" r="4.5" />
        <circle stroke="#7E8897" fill="#1D2027" cx="5" cy="5" r="4.5" />
        <path
          d="M62 59h94a3 3 0 013 3v19a3 3 0 01-3 3H62a3 3 0 01-3-3V62a3 3 0 013-3zM111 8L59 59M211 31l-52 53"
          stroke="#FD812B"
          strokeLinecap="round"
          strokeDasharray="6"
        />
      </g>
    </svg>
  ),
};

export default Images;
