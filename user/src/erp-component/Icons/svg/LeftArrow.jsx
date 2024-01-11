

const Index = ({ className, style, fill }) => {

    return (
        <svg className={className} style={style} width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="01 align center">
                <path id="Vector" d="M10.512 4.32164L6.93449 0.744141L5.75616 1.92247L8.50033 4.66664H0.166992V6.33331H8.50033L5.75616 9.07747L6.93449 10.2558L10.512 6.67831C10.8244 6.36576 11 5.94191 11 5.49997C11 5.05803 10.8244 4.63419 10.512 4.32164Z" fill={fill || `#C5C5C5`} />
            </g>
        </svg>
    )
}

export default Index;

