import * as React from 'react'
import { Food } from '../util/interface'

export interface UserContextInterface {
    login: boolean
    setLogin: (a: boolean) => void
    admin: boolean
    setAdmin: (a: boolean) => void
    name: string | null
    setName: (a: string | null) => void
    createPlanList: Food[]
    myPlan: Food[]
    setCreatePlanList: (a: Food[]) => void
    setMyPlan: (a: Food[]) => void
    setMyFavorite: (a: Food[]) => void
    myFavorite: Food[]
    handleAddToCreatePlan: (food: Food) => void
    handleRemoveFromCreatePlan: (id: number | undefined) => void
    handleAddToFavorite: (food: Food) => void
    handleRemoveFromFavorite: (id: number) => void
}
const UserContext = React.createContext<UserContextInterface>({
    login: false,
    setLogin: () => {},
    setAdmin: () => {},
    admin: false,
    name: null,
    setName: () => {},
    createPlanList: [],
    myFavorite: [],
    myPlan: [],
    setCreatePlanList: () => {},
    setMyPlan: () => {},
    setMyFavorite: () => {},
    handleAddToCreatePlan: () => {},
    handleRemoveFromCreatePlan: () => {},
    handleAddToFavorite: () => {},
    handleRemoveFromFavorite: () => {},
})

export function UserProvider({ children }: any) {
    const [login, setLogin] = React.useState<boolean>(false)
    const [admin, setAdmin] = React.useState<boolean>(false)
    const [name, setName] = React.useState<string | null>(null)
    const [createPlanList, setCreatePlanList] = React.useState<Food[]>([])
    const [myFavorite, setMyFavorite] = React.useState<Food[]>([])
    const [myPlan, setMyPlan] = React.useState<Food[]>([])
    // get user favorite dishes

    React.useEffect(() => {
        if (login && name) {
            fetch('https://foodyforapi.herokuapp.com/getFavList', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                }),
            })
                .then((res) => res.json())
                .then((obj) => {
                    if (obj.result === 'ok') setMyFavorite(obj.message)
                })
                .catch((error) => console.log(error))
        }
    }, [name, login])

    const handleAddToCreatePlan = (food: Food) => {
        if (food) setCreatePlanList([...createPlanList, food])
    }

    const handleRemoveFromCreatePlan = (id: number | undefined) => {
        if (id) {
            const arr = createPlanList.filter((food) => food.id !== id)
            setCreatePlanList(arr)
        } else setCreatePlanList([])
    }

    const handleAddToFavorite = (food: Food) => {
        if (food) {
            fetch('https://foodyforapi.herokuapp.com/favList', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                    foodId: food.id,
                }),
            })
                .then((res) => res.json())
                .then((obj) => {
                    if (obj.result === 'ok')
                        setMyFavorite([...myFavorite, food])
                })
                .catch((error) => console.log(error))
        }
    }

    const handleRemoveFromFavorite = (id: number) => {
        if (id) {
            fetch('https://foodyforapi.herokuapp.com/favList', {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                    foodId: id,
                }),
            })
                .then((res) => res.json())
                .then((obj) => {
                    if (obj.result === 'ok') {
                        const arr = myFavorite.filter((food) => food.id !== id)
                        setMyFavorite(arr)
                    }
                })
                .catch((error) => console.log(error))
        }
    }

    return (
        <UserContext.Provider
            value={{
                login,
                admin,
                name,
                setName,
                setLogin,
                setAdmin,
                createPlanList,
                myFavorite,
                myPlan,
                setCreatePlanList,
                setMyPlan,
                setMyFavorite,
                handleAddToCreatePlan,
                handleRemoveFromCreatePlan,
                handleAddToFavorite,
                handleRemoveFromFavorite,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
