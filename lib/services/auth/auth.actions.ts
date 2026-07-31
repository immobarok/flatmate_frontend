"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { withServerAction, type ActionState } from "../core/serverAction"
import { authServices } from "./auth.services"
import type { AuthResponse, LoginRequest, RegisterRequest } from "./auth.types"

export async function loginAction(
  credentials: LoginRequest
): Promise<ActionState<AuthResponse>> {
  return withServerAction(async () => {
    const data = await authServices.login(credentials)

    const cookieStore = await cookies()
    cookieStore.set("access_token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    revalidatePath("/")
    return data
  })
}

export async function registerAction(
  data: RegisterRequest
): Promise<ActionState<AuthResponse>> {
  return withServerAction(async () => {
    const responseData = await authServices.register(data)

    const cookieStore = await cookies()
    cookieStore.set("access_token", responseData.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    revalidatePath("/")
    return responseData
  })
}
