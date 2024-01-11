import React from 'react'

const Index = ({ className, style, ...otherProps }) => {
    return (
        <svg className={className} style={style} {...otherProps} xmlns="http://www.w3.org/2000/svg" width="49" height="115" viewBox="0 0 49 115" fill="none">
            <g filter="url(#filter0_d_278_10175)">
                <path d="M18.6066 44.8934L49.5 14V97L18.6066 66.1066C12.7487 60.2487 12.7487 50.7513 18.6066 44.8934Z" fill="#23A4DD" />
                <path d="M33.4819 47L26.0072 54.4747C25.6166 54.8652 25.6166 55.4984 26.0072 55.8889L33.4819 63.3636" stroke="white" stroke-width="2" stroke-linecap="round" />
                <path d="M43.3 48.6367L37.4616 54.4751C37.0711 54.8656 37.0711 55.4988 37.4616 55.8893L43.3 61.7276" stroke="white" stroke-width="2" stroke-linecap="round" />
            </g>
            <defs>
                <filter id="filter0_d_278_10175" x="-6" y="0" width="73.5" height="115" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="2" dy="2" />
                    <feGaussianBlur stdDeviation="8" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.137255 0 0 0 0 0.643137 0 0 0 0 0.866667 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_278_10175" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_278_10175" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

export default Index