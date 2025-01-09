import { createMessageResponseAdapter, getMessageResponseAdapter } from '@/adapters/messageResponseAdapter'
import { API_URL } from '@/config/config'
import { authHeaderInterceptor } from '@/interceptors/authHeaderInterceptor'
import { User } from '@/types/models'
import { CreateMessageResponseType, MessageResponseType } from '@/types/responseTypes'
import { CreateMessageRequestType } from '@/types/requestTypes'

export const getChatMessages = async (user: User, chatId: number): Promise<MessageResponseType> => {
  try {
    const authHeader = authHeaderInterceptor(user)
    const url = `${API_URL}/api/messages/${chatId}/messages`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    })

    if (response.status === 500) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await getMessageResponseAdapter(response)
  } catch (error) {
    console.error('Error fetching chat messages', error)
    throw error
  }
}

export const createMessage = async (
  createMessageRequest: CreateMessageRequestType,
  user: User,
  chatId: number
): Promise<CreateMessageResponseType> => {
  try {
    const authHeader = authHeaderInterceptor(user)
    const url = `${API_URL}/api/messages/${chatId}/messages`
    console.log('createChatRequest', createMessageRequest)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(createMessageRequest),
    })

    if (response.status === 500) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await createMessageResponseAdapter(response)
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}
