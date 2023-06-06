import type { MockMethod } from 'vite-plugin-mock'
import { meMock } from './me.mock'
import { itemsMock } from './items.mock'
import { sessionMock } from './sessionmock'
import { tagsMock } from './tag.mocks'
import { summaryMock } from './summary.mock'
export default [
  ...itemsMock,
  ...meMock,
  ...sessionMock,
  ...tagsMock,
  ...summaryMock
] as MockMethod[]
