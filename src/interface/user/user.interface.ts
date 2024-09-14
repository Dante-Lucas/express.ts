import { Request, Response } from "express";

export interface Iuser {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
   
}