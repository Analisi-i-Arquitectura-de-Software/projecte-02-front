import { ExternalUser, Message, UserChat } from './models'

export type AuthResponseType = {
  data: {
    accessToken: string
    refreshToken: string
  } | null
  errorMessage: string | null
}

export type ChatResponseType = {
  data: UserChat[] | null
  errorMessage: string | null
}

export type UserResponseType = {
  data: ExternalUser | null
  errorMessage: string | null
}

export type CreateChatResponseType = {
  data: {
    id: number
    name: string
  } | null
  errorMessage: string | null
}

export type MessageResponseType = {
  data: Message[] | null
  errorMessage: string | null
}

export type CreateMessageResponseType = {
  message: Message | null
  errorMessage: string | null
}

