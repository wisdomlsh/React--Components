import type { Dayjs } from "dayjs";

export function getAllDays(date: Dayjs) {
    // 获取当月的天数
    // const daysInMonth = date.daysInMonth();
    // 获取当月第一天
    const startDate = date.startOf('month');
    // 获取当月第一天的星期数
    const day = startDate.day()

    const daysInfo = new Array(6 * 7);

    // 填充这个月开始的上个月的日期
    for (let i = 0; i < day; i++) {
        daysInfo[i] = {
            date: startDate.subtract(day - i, 'day'),
            currentMonth: false
        }
    }

    // 填充这个月的日期
    for (let i = day; i < daysInfo.length; i++) {

        // 获取每次循环添加的日期的月份
        const calcDate = startDate.add(i - day, 'day')
        daysInfo[i] = {
            date: startDate.add(i - day, 'day'),
            currentMonth: calcDate.month() === date.month()
        }
    }

    return daysInfo

}
