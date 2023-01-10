import * as React from 'react'

export interface AdminContextInterface {
    userBanRecentlyList: { username: string }[]
    setUserBanRecentlyList: (a: { username: string }[]) => void
    handleBanUser: (a: string) => void
}

const AdminContext = React.createContext<AdminContextInterface>({
    userBanRecentlyList: [],
    setUserBanRecentlyList: () => { },
    handleBanUser: () => { },
})

export function AdminProvider({ children }: any) {
    const [userBanRecentlyList, setUserBanRecentlyList] = React.useState<
        { username: string }[]
    >([])

    const handleBanUser = () => {

    }

    return (
        <AdminContext.Provider
            value={{
                userBanRecentlyList,
                setUserBanRecentlyList,
                handleBanUser,
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContext
