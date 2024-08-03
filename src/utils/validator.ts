export const IsvalidPassword = (password:string,password2?:string):boolean => {
    if(password === '' || password2 === '') {
        console.log('Os campos de senha devem ser preenchidos!')
        return false
    }
    if (password !== password2) {
        console.log('Os campos de senha são diferentes!')
        return false
    }
    return true
}