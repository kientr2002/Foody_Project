import * as React from 'react'
import UserContext, { UserProvider } from '../context/UserContext'
import AdminView from './admin/AdminView'
import AuthenticationView from './authentication/AuthenticationView'
import UserView from './user/UserView'

export default function Index() {
    const { login, admin } = React.useContext(UserContext)
    const [page, setPage] = React.useState<string>('login')

    React.useEffect(() => {
        if (login) {
            if (admin) setPage('admin')
            else setPage('user')
        } else if (!login && !admin) {
            setPage('login')
        }
    }, [login, admin])

    return (
        <>
            {page === 'login' ? (
                <AuthenticationView />
            ) : page === 'user' ? (
                <UserView />
            ) : (
                <AdminView />
            )}
        </>
    )
}
