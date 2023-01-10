const convertDate = (string: string | null): string | null => {
    if (!string) return null
    let date = new Date(string)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export default convertDate
