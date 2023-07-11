import fs from 'fs'
import { resolve } from 'path'

import { StorageProvider } from '../StorageProvider'
import Upload from '@/config/Upload'

class LocalStorageProvider implements StorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(Upload.tmpFolder, file),
      resolve(`${Upload.tmpFolder}/${folder}`, file),
    )

    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${Upload.tmpFolder}/${folder}`, file)

    try {
      await fs.promises.stat(filename)
    } catch {
      return
    }
    await fs.promises.unlink(filename)
  }
}

export { LocalStorageProvider }
