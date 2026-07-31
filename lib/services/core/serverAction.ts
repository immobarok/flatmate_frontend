import { ApiException } from "./apiClient"

export type ActionState<T> =
  | { data: T; error: null; success: true }
  | { data: null; error: string; success: false; details?: any }

export async function withServerAction<T>(
  action: () => Promise<T>
): Promise<ActionState<T>> {
  try {
    const data = await action()
    return { data, error: null, success: true }
  } catch (error) {
    if (error instanceof ApiException) {
      return {
        data: null,
        error: error.message,
        success: false,
        details: error.details,
      }
    }
    return {
      data: null,
      error: "An unexpected error occurred on the server",
      success: false,
    }
  }
}
