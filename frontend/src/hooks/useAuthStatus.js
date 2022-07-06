import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }

        // we checked if user was logged in
        setCheckingStatus(false)
    }, [user])
    return {loggedIn, checkingStatus}
}