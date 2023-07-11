import { UsersRepository } from '@/repositories/UsersRepository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsByEmailError } from '../errors/UserAlreadyExistsByEmailError'
import { UserAlreadyExistsByUsernameError } from '../errors/UserAlreadyExistsByUsernameError'

interface RegisterUseCaseRegister {
  name: string
  username: string
  email: string
  password: string
  isAdmin: boolean
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    username,
    email,
    password,
    isAdmin,
  }: RegisterUseCaseRegister): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsByEmailError()
    }

    const userWithSameUsername = await this.usersRepository.findByUsername(
      username,
    )

    if (userWithSameUsername) {
      throw new UserAlreadyExistsByUsernameError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password_hash,
      is_admin: isAdmin,
    })

    return { user }
  }
}
