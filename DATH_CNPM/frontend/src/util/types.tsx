import { NavigatorScreenParams } from '@react-navigation/native'
import { Food } from './interface'

type AuthenticationStackParamList = {
    Login: undefined
    'Sign Up': undefined
    'Forgot password step 1': undefined
    'Forgot password step 2': undefined
    'Change password': undefined
}

type AdminTabParamList = {
    'Manage Dish': NavigatorScreenParams<ManageDishStackParamList>
    'Manage Account': NavigatorScreenParams<ManageAccountStackParamList>
    'Profile page': NavigatorScreenParams<AdminProfileStackParamList>
}

type ManageDishStackParamList = {
    'Food list': {id: any} | Food | undefined
    'Food detail': Food
    'Edit Food': Food
    'Add Food': undefined
}

type ManageAccountStackParamList = {
    'Account list': {username: string, isBanned: boolean} | undefined
    'Account detail': {username: string} | undefined
}

type AdminProfileStackParamList = {
    'My profile': undefined
    'Change password': undefined
}

type UserTabParamList = {
    'Home page': NavigatorScreenParams<HomeStackParamList>
    'MyPlan page': undefined
    'Search page': NavigatorScreenParams<SearchStackParamList>
    'Favorite page': NavigatorScreenParams<FavoriteStackParamList>
    'Profile page': undefined
}

type HomeStackParamList = {
    'Food List': undefined
    'Food Detail': Food
    'Create Plan': undefined
}

type MyPlanStackParamList = {
    'MyPlan List': undefined
    'Food Detail': Food
    'Create Plan': undefined
}

type FavoriteStackParamList = {
    'Favorite List': undefined
    'Food Detail': Food
    'Create Plan': undefined
}

type SearchStackParamList = {
    'Search List': undefined
    'Food Detail': Food
    'Create Plan': undefined
}

type ProfileStackParamList = {
    'My profile': undefined
    'Update status': undefined
    'Change password': undefined
}

export {
    AuthenticationStackParamList,
    UserTabParamList,
    HomeStackParamList,
    MyPlanStackParamList,
    FavoriteStackParamList,
    SearchStackParamList,
    ProfileStackParamList,
    AdminTabParamList,
    ManageAccountStackParamList,
    ManageDishStackParamList,
    AdminProfileStackParamList,
}
