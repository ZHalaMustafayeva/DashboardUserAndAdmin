

const Index = ({ className, style, fill }) => {

    return (
        <svg className={className} style={style} width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="01 align center">
                <path id="Vector" d="M10.833 4.66664H2.49964L5.24381 1.92247L4.06548 0.744141L0.487977 4.32164C0.175525 4.63419 0 5.05803 0 5.49997C0 5.94191 0.175525 6.36576 0.487977 6.67831L4.06548 10.2558L5.24381 9.07747L2.49964 6.33331H10.833V4.66664Z" fill={fill || `#C5C5C5`} />
            </g>
        </svg>
    )
}

export default Index;