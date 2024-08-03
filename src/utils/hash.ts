import { hash } from "bcrypt"
export  const passwordHash = (password:string,salt:number) => {
    const saltRounds = salt
    const pass = hash(password,saltRounds)
    return pass
}
