type User = {
    id: number
    name: string
    email: string
}

type Login = {
    email: string,
    password: string
}

// セレクトボックス用
type SelectUser = {
    value: string
    label: string
}

export type {
    User,
    Login,
    SelectUser
}
