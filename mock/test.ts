import type { MockMethod } from 'vite-plugin-mock'
import { meMock } from './me.mock'
import { itemsMock } from './items.mock'
import { sessionMock } from './sessionmock'
import { tagsMock } from './tag.mocks'
export default [
  ...itemsMock,
  ...meMock,
  ...sessionMock,
  ...tagsMock
] as MockMethod[]
