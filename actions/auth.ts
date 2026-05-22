"use server";

import { createSession, deleteSession } from "@/lib/auth";
import { LoginSchema } from "@/types/project";
import { redirect } from "next/navigation";

export interface LoginState {
  error?: string;
}

export async function login(
  _prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Please fill in all fields" };
  }

  const { username, password } = parsed.data;

  // Validate against env credentials
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { error: "Invalid username or password" };
  }

  await createSession(username);
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
