import Upload from '@/config/Upload'
import { env } from '@/env'

import fs from 'fs'
import { resolve } from 'path'
import { StorageProvider } from '../StorageProvider'
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

export class S3StorageProvider implements StorageProvider {
  private client: S3Client

  constructor() {
    this.client = new S3Client({
      region: env.AWS_BUCKET_REGION,
    })
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(Upload.tmpFolder, file)
    const fileContent = await fs.promises.readFile(originalName)

    const upload = new PutObjectCommand({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: `${folder}/${file}`,
      ACL: 'public-read',
      Body: fileContent,
    })

    try {
      await fs.promises.unlink(originalName)

      await this.client.send(upload)
      // console.log(response)

      return file
    } catch (error) {
      console.error('Erro durante o upload para o S3:', error)
      throw error // Lança o erro novamente para quem chamou o método save
    }
  }

  async delete(file: string, folder: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: `${folder}/${file}`,
    })

    try {
      await this.client.send(command)
      // console.log(response)
    } catch (err) {
      console.error(err)
    }
  }
}
