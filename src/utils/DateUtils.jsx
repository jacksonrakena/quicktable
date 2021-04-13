import { DateTime } from 'luxon';

export default class DateUtils {
    /**
     * Finds the last, or next weekday.
     * @param {DateTime} date The relative date.
     * @param {'backwards' | 'forwards'} direction Whether to search for the next ('forwards') or last ('backwards') weekday.
     */
    static findNearestWeekday(date, direction = 'forwards') {
        while (date.weekday == 6 || date.weekday == 7) {
            if (direction == 'forwards') {
                date = date.plus({ days: 1 })
            } else {
                date = date.minus({ days: 1 })
            }
        }
        return date
    }

    static nextWeekday(date) {
        date = date.plus({ days: 1 })
        return this.findNearestWeekday(date)
    }
}