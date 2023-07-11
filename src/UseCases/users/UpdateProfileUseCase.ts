import { UsersRepository } from '@/repositories/UsersRepository'
import { UserAlreadyExistsByEmailError } from '../errors/UserAlreadyExistsByEmailError'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError'

interface UpdateProfileUseCaseRequest {
  id: string
  name: string
  email: string
  password?: string
}

export class UpdateProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ id, name, email, password }: UpdateProfileUseCaseRequest) {
    let password_hash = ''
    const emailAlreadyExists =
      await this.usersRepository.findByEmailOtherThanTheEmailEntered(id, email)

    if (emailAlreadyExists) {
      throw new UserAlreadyExistsByEmailError()
    }

    const userAlreadyExist = await this.usersRepository.findById(id)

    if (!userAlreadyExist) {
      throw new ResourceNotFoundError()
    }
    password_hash = userAlreadyExist.password_hash

    if (password) {
      password_hash = await hash(password, 6)
    }

    const user = await this.usersRepository.update(
      id,
      name,
      email,
      password_hash,
    )

    return user
  }
}
