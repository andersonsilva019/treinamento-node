import { Request, Response } from 'express'
import CreateCourseService from './CreateCourseService'


export function createCourse(request: Request, response: Response) {
  const createCourseService = new CreateCourseService()

  createCourseService.execute({
    name: 'Nodejs',
    duration: 20,
    educator: 'Martin'
  })

  return response.send()
}