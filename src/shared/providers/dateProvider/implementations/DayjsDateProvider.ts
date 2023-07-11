import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { DateProvider } from '../DateProvider'

dayjs.extend(utc)

export class DayjsDateProvider implements DateProvider {
  addDays(days: number) {
    return dayjs().add(days, 'days').toDate()
  }

  addHours(hours: number): Date {
    const date = dayjs().add(hours, 'hour').toDate()
    return date
  }
}
