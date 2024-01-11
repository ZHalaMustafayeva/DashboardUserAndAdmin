import React from 'react'

const Index = ({ className, style }) => {

    return (


        <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="white" />
            <path d="M7 12H17" stroke="#505050" stroke-width="2" stroke-linecap="round" />
            <path d="M12 7L12 17" stroke="#505050" stroke-width="2" stroke-linecap="round" />
            <rect x="0.5" y="0.5" width="23" height="23" rx="5.5" stroke="black" stroke-opacity="0.1" />
            <defs>
                <clipPath id="clip0_529_16923">
                    <rect width="18" height="18" fill="white" transform="translate(0.428589)" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default Index;