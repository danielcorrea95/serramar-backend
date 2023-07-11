import { InMemoryUsersRepository } from '@/repositories/InMemory/InMemoryUsersRepository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './AuthenticateUseCase'
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password_hash: await hash('123456', 6),
      email: 'johndoe@example.com',
      is_admin: false,
      role_id: 'role-id',
      deleted: false,
    })

    const { user } = await sut.execute({
      username: 'johndoe',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong username', async () => {
    await expect(() =>
      sut.execute({
        username: 'johndoe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password_hash: await hash('123456', 6),
      email: 'johndoe@example.com',
      is_admin: false,
      role_id: 'role-id',
      deleted: false,
    })

    await expect(() =>
      sut.execute({
        username: 'johndoe',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
