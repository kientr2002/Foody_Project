interface Food {
    id: number
    name: string
    des: string
    image: string
    avgStar: number
    recipt: string
    calo: number | null
    protein: number | null
    fat: number | null
    carb: number | null
}

interface Comment {
    username: string | null
    star: number
    comment: string
}

interface User {
    userId: number
    username: string
    pass: string
    name: string
    sex: string
    email: string
    ques: string
    ans: string
    role: number
    weight: number
    height: number
    acin: string
    object: string
    TDEE: number
    adminId: number
    dob: string
    id: number
    status: number
}

export { Food, Comment, User }
