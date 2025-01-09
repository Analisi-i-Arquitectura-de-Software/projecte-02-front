export interface User {
  username: string | undefined
  email: string | undefined
  accessToken: string | undefined
}

export interface Session extends User {
  refreshToken: string | undefined
}

export interface UserChat {
  id: number
  logo?: string
  name: string
  unreadMessages: number
}

export interface ExternalUser {
  id: number
  username: string
}

export enum ChatType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
}

export interface Message {
  id: number
  content: string
  timestamp: Date
  type: MessageType
  author: ExternalUser
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}
