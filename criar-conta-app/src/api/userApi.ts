import { UserService, CreateUserData } from '../services/userService';

export async function createUser(userData: CreateUserData) {
  try {
    const user = await UserService.createUser(userData);
    return { success: true, user };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Erro desconhecido ao criar usuário' };
  }
}
