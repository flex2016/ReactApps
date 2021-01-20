import React from "react";
import { Link } from "react-router-dom";

import OKlogo from "../../Resources/images/logos/logo.svg";
import svgFile from "../../Resources/svg/sprite.svg";

export const Logo = props => {
  const template = (
    <div
      className={props.className}
      style={{
        width: props.width,
        height: props.height
      }}
    >
      <svg viewBox="0 0 207.64 211.52">
        <path
          d="M176.65,204a.16.16,0,0,1-.25-.13V179.6c0-1.59,1.37-2.19,2.28-3.09,20.32-20.29,30.11-44.81,27.85-73.41C204.66,79.57,194.77,59.26,177,43.51,151,20.38,121,13.1,87.49,24c-32.66,10.62-53.43,33.32-61,66.24-8.41,36.49,3.46,67.33,31.86,91.71,1.58,1.36,6.44,4.13,6.44,2.82,0-1.83,0-3.67,0-5.68.09-18.31.51-36.65-.16-54.94.25-8.11,1.52-12.58,7.55-18.93C77.44,99.71,83,94,88.32,88.33c.9-1,4.06-3.91,4.06-2.26,0,1.45.14,2.91.1,4.19-1.09,34.44-.09,68.9-.59,103.35-.06,4.23,1.09,6.72,4.93,6.72,3.64,0,5.35-.17,5.33-4q-.25-78.18-.27-156.36c0-3.18.15-6.8.18-10.48a.36.36,0,0,1,.61-.26c2.93,2.94,6,6,8.67,8.61,5.21,5.12,10.14,10.51,15.12,15.84a10.13,10.13,0,0,1,3.1,7.11q0,64.68,0,129.36c0,1.32-.15,2.66-.15,4,0,2.55-.67,6.16,4,6.16,4.85,0,5.61-1.76,5.61-6.16q0-60.19-.05-120.39c0-1.4,0-2.6,0-4.47,0-1.26,3.34,1.44,4.39,2.33,6.94,5.89,13.8,11.89,20.74,17.77a7.13,7.13,0,0,1,2.68,6q-.12,55.46,0,110.91c0,3-.84,4.92-3.6,6.33-48.8,24.93-109.42,7.09-137.41-40.12-26.57-44.81-15.72-103.3,24-135,24.61-19.66,55.22-29,85.64-23.64,40.56,9.62,68.19,34.44,80.84,75.48a28.3,28.3,0,0,1,.9,3.85C223.74,135.51,211.43,180,176.65,204Z"
          transform="translate(-11.16 -12.37)"
        />
      </svg>
    </div>
  );

  if (props.link) {
    return (
      <Link to={props.linkTo} className={props.className}>
        {template}
      </Link>
    );
  } else {
    return template;
  }
};
export const SvgIcons = props => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <use xlinkHref={`${svgFile}#${props.name}`} />
    </svg>
  );
};
export const ImgSrc = props => {
  return <img src={props.src} alt={props.alt} className={props.className} />;
};
