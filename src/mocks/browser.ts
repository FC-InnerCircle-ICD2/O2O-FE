import { setupWorker } from 'msw/browser' // msw/browser 대신 msw
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
