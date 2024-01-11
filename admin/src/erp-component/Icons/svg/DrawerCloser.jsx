import React from 'react'

const Index = ({ className, style, ...otherProps }) => {
    return (
        <svg className={className} style={style} {...otherProps} xmlns="http://www.w3.org/2000/svg" width="68" height="115" viewBox="0 0 68 115" fill="none">
            <g clip-path="url(#clip0_281_10370)" filter="url(#filter0_d_281_10370)">
                <path d="M18.6066 44.8934L49.5 14V97L18.6066 66.1066C12.7487 60.2487 12.7487 50.7513 18.6066 44.8934Z" fill="#23A4DD" />
                <path d="M35.8182 63L43.2929 55.5253C43.6834 55.1348 43.6834 54.5016 43.2929 54.1111L35.8182 46.6364" stroke="white" stroke-width="2" stroke-linecap="round" />
                <path d="M26 61.3633L31.8383 55.5249C32.2288 55.1344 32.2288 54.5012 31.8383 54.1107L26 48.2724" stroke="white" stroke-width="2" stroke-linecap="round" />
            </g>
            <defs>
                <filter id="filter0_d_281_10370" x="-6" y="0" width="73.5" height="115" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="2" dy="2" />
                    <feGaussianBlur stdDeviation="8" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.137255 0 0 0 0 0.643137 0 0 0 0 0.866667 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_281_10370" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_281_10370" result="shape" />
                </filter>
                <clipPath id="clip0_281_10370">
                    <rect width="41.5" height="83" fill="white" transform="translate(8 14)" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default Index