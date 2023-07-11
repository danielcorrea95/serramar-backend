import { InMemoryUsersRepository } from '@/repositories/InMemory/InMemoryUsersRepository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsByEmailError } from '../errors/UserAlreadyExistsByEmailError'
import { UserAlreadyExistsByUsernameError } from '../errors/UserAlreadyExistsByUsernameError'
import { RegisterUseCase } from './RegisterUseCase'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      username: 'john.doe',
      password: '123456',
      roleId: 'role-id',
      email: 'johndoe@example.com',
      isAdmin: false,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      username: 'john.doe',
      password: '123456',
      roleId: 'role-id',
      email: 'johndoe@example.com',
      isAdmin: false,
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      username: 'johndoe1',
      password: '123456',
      roleId: 'role-id',
      email,
      isAdmin: false,
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        username: 'johndoe2',
        password: '123456',
        roleId: 'role-id',
        email,
        isAdmin: false,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsByEmailError)
  })

  it('should not be able to register with same username twice', async () => {
    await sut.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
      roleId: 'role-id',
      email: 'new-user1@example.com',
      isAdmin: false,
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        username: 'johndoe',
        password: '123456',
        roleId: 'role-id',
        email: 'new-user2@example.com',
        isAdmin: false,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsByUsernameError)
  })
})
