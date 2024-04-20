export interface ITodo {
  _id: string 
  title: string
  completed: boolean
  date?: Date
}

export type TUser = {
  _id: string
  email: string
  name: string
}