import styled from "styled-components";

const _div = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Index = ({ className, style }) => {

    return (
        <_div>
            <svg className={className} style={style} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="fi-rs-angle-small-up">
                    <g id="01 align center">
                        <path id="Vector" d="M14.4111 12.6725L10.0003 8.26165L5.58947 12.6725L4.41113 11.4941L8.82197 7.08331C9.13451 6.77086 9.55836 6.59534 10.0003 6.59534C10.4422 6.59534 10.8661 6.77086 11.1786 7.08331L15.5895 11.4941L14.4111 12.6725Z" 
                        fill="#262626"
                         />
                    </g>
                </g>
            </svg>
            <svg className={className} style={style} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="fi-rs-angle-small-down">
                    <g id="01 align center">
                        <path id="Vector" d="M9.99981 12.9167C9.78097 12.9171 9.56421 12.8742 9.36199 12.7905C9.15977 12.7069 8.97608 12.5841 8.82148 12.4292L4.41064 8.01751L5.58898 6.83917L9.99981 11.25L14.4106 6.83917L15.589 8.01751L11.1781 12.4283C11.0236 12.5834 10.8399 12.7063 10.6377 12.7901C10.4355 12.8739 10.2187 12.9169 9.99981 12.9167Z" 
                        fill="#262626"
                         />
                    </g>
                </g>
            </svg>
        </_div>
    )
}

export default Index;