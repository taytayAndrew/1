import type { MockMethod } from 'vite-plugin-mock'
import { meMock } from './me.mock'
import { itemsMock } from './items.mock'
export default [
  itemsMock,
  meMock
 
] as MockMethod[]
