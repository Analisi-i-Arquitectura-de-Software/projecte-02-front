import { authResponseAdapter } from '@/adapters/authResponseAdapter'
import { API_URL } from '@/config/config'
import { FormDataType } from '@/types/dataTypes'
import { AuthResponseType } from '@/types/responseTypes'

export const loginUser = async (
  data: FormDataType
): Promise<AuthResponseType> => {
  try {
    const url = `${API_URL}/auth/login`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.status === 500) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await authResponseAdapter(response)
  } catch (error) {
    console.error('Login failed: ', error)

    throw error
  }
}