import { Request, Response } from "express";
import { prisma } from "../../database/prisma";
import { request } from "http";
import { ITaskRequest } from "../../interface/task/task.interface";
import { isValidTask } from "../../utils/validator";


class TaskService {

    public getAll = async(request: Request, response: Response) => {
        
        const tasks = await prisma.task.findMany()

        return response.status(200).json(tasks)
    }

    public create = async(request: Request, response: Response) => {
        const {title, description}:ITaskRequest = request.body 

        if(!isValidTask(title,description)) {
            return response.status(400).json({ message: 'Erro de validação' })
        }
        try {    
            const newTask = await prisma.task.create({
                data : {
                    title: title,
                    content: description,
                    status:Boolean(false)
                }
            })

            return response.status(201).json(newTask)
        } catch (error) {
            return response.status(500).json({ message: 'Erro na criação da tarefa' })
        }
    }

    public getId = async(request: Request, response: Response) => {
        const {id} = request.params
        try{
            
            const task = await prisma.task.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!task) {
                return response.status(404).json({ message: 'Tarefa não encontrada' })
            } else {
                return response.status(200).json(task)
            }
        } catch (error) {
            return response.status(500).json({ message: 'Erro na busca da tarefa' })
        }
    }

    public update = async(request: Request, response: Response) => {
        const {id} = request.params
        const {title, description} = request.body
        try {
            const task = await prisma.task.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title: title,
                    content: description
                }
            })

            if (!task) {
                return response.status(404).json({ message: 'Tarefa não encontrada' })
            } else {
                return response.status(200).json(task)
            }
        } catch (error) {
            return response.status(500).json({ message: 'Erro na atualização da tarefa' })
        }
    }

    public delete = async(request: Request, response: Response) => {
        const {id} = request.params
        try {
            const task = await prisma.task.delete({
                where: {
                    id: Number(id)
                }
            })
            
            if (!task) {
                return response.status(404).json({ message: 'Tarefa não encontrada' })
            } else {
                return response.status(204).json({ message: 'Tarefa excluída com sucesso' })
            }
        } catch (error) {
            return response.status(500).json({ message: 'Erro na exclusão da tarefa' })
        }
    }

    public completed = async(request: Request, response: Response) => {
        const {id} = request.params
        const task = prisma.task.findUnique({
            where: {
                id: Number(id),
                status: Boolean(false)
            }
        })

        if(!task){
            return response.status(404).json({ message: 'Tarefa não encontrada' }) 
        }
        
        const completed = await prisma.task.update({
            where:{
                id: Number(id)
            },
            data:{
                status: Boolean(true)
            }
        })
        
        return response.status(200).json(completed.status) 
    }
}

export const taskService = new TaskService()

