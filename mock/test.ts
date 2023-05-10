import type { MockMethod } from 'vite-plugin-mock'
import { meMock } from './me.mock'
import { itemsMock } from './items.mock'
import { sessionMock } from './sessionmock'
export default [
  itemsMock,
  meMock,
  sessionMock
 
] as MockMethod[]
