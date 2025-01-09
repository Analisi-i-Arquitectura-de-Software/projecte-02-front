import { Message } from '@/types/models'
import { CreateMessageResponseType, MessageResponseType } from '@/types/responseTypes'

export const getMessageResponseAdapter = async (
  response: Response
): Promise<MessageResponseType> => {
  const responseData = await response.json()

  // Verificar si la respuesta tiene los datos esperados
  if (response.ok) {
    return {
      data: responseData.data.map((message: Message) => ({
        id: message,
        content: message.content,
        timestamp: message.timestamp,
        type: message.type,
        author: message.author,
      })),
      errorMessage: null,
    }
  }

  // Si no es una respuesta correcta, manejar el error
  return {
    data: null,
    errorMessage: responseData.errorMessage || 'Unknown error',
  }
}

export const createMessageResponseAdapter = async (
  response: Response
): Promise<CreateMessageResponseType> => {
  const responseData = await response.json()

  // Verificar si la respuesta tiene los datos esperados
  if (response.ok) {
    return {
      message: responseData.message,
      errorMessage: null,
    }
  }

  // Si no es una respuesta correcta, manejar el error
  return {
    message: null,
    errorMessage: responseData.errorMessage || 'Unknown error',
  }
}
