export function isValidCredencials(username:string,email:string):boolean {
    if(username === '' || email === '') {
        console.log('Os campos de email e username devem ser preenchidos!')
        return false
    }
    return true
}
export function IsvalidPassword(password:string,password2?:string):boolean {
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

export function isValidTask(title:string,description:string):boolean {
    if(title === '' || description === '') {
        return false
    }
    return true
}