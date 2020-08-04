export type Event = {
  id: number
  title: string
  date: string
}

export type Category = {
  id: number
  name: string
}

export type Timeline = {
  id: number
  title: string
  description?: string,
  events?: Array<Event>,
  categories?: Array<Category>
}
