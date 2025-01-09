import { ChatType, MessageType } from './models'

export type CreateChatRequestType = {
  name?: string
  userIds: number[]
  type: ChatType
}

export type CreateMessageRequestType = {
  content: string
  type: MessageType
}
