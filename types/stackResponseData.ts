export interface StackItem {
  _id: string
  title: string
  image: {
    public_id: string | null
    url: string
  }
  __v: number
}

export interface StackApiResponse {
  success: boolean
  message: string
  data: StackItem[]
}
