var isDev: boolean
type JSONValue = string | number | boolean | null | { [k: string]: JSONValue } | JSONValue[]

type Resource<T> = {
  resource: T
}
type Resources<T> = {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}
type User = {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}
type Item = {
  id: number
  user_id: number
  amount: number
  note?: string
  tags?:Tag[]
  tag_ids: number[]
  happened_at: string
  created_at: string
  updated_at: string
  kind: 'expenses' | 'income'
  deleted_at?: string
}
type Tag = {
  id: number
  kind: Item['kind']
  user_id: number
  name: string
  sign: string
  deleted_at: string | null
  created_at: string
  updated_at: string
}