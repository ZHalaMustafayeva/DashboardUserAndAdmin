import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Index = ({ children }) => {
    let navigate = useNavigate()
    let token = localStorage?.access_token

    useEffect(() => {
        if (!token) { navigate('/login') }

    }, [])
    return children 
}

export default Index