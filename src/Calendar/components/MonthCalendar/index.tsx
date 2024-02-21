import React, { useContext } from "react";
import type { Dayjs } from "dayjs";
import type { CalendarProps } from "../../";
import { getAllDays } from "../../../utils";
import cs from "classnames";
import LocaleContext from "../../LocaleContext";
import allLocales from "../../locale";
import "./index.scss";


interface MonthCalendarProps extends CalendarProps {
  selectHandle?: (date: Dayjs) => void
  curMonth: Dayjs
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ value, curMonth, dateRender, dateInnerContent, selectHandle }) => {

  // 国际化
  const localeContext = useContext(LocaleContext)
  const CalendarLocale = allLocales[localeContext.locale];

  const allDays = getAllDays(curMonth)

  // 渲染函数 renderDays
  function renderDays(days: Array<{ date: Dayjs, currentMonth: boolean }>) {
    const rows = [];

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = <div className={'calendar-month-body-cell ' + (item?.currentMonth ? 'calendar-month-body-cell-current' : '')} onClick={() => selectHandle?.(item.date)}>{
          dateRender ? dateRender(item.date) : (
            <div className="calendar-month-body-cell-date">
              <div className={cs("calendar-month-body-cell-date-value",
                value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                  ? "calendar-month-body-cell-date-selected"
                  : ""
              )} >{item.date.date()}</div>
              <div className="calendar-month-body-cell-date-content">{dateInnerContent?.(item.date)}</div>
            </div>
          )
        }</div>
      }
      rows.push(row);
    }

    return rows.map(row => <div className="calendar-month-body-row">{row}</div>)
  }


  const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return <div className="calendar-month">
    <div className="calendar-month-week-list">
      {weekList.map((week) => (
        <div className="calendar-month-week-list-item" key={week}>
          {CalendarLocale.week[week]}
        </div>
      ))}
    </div>
    <div className="calendar-month-body">
      {
        renderDays(allDays)
      }
    </div>
  </div>
}

export default MonthCalendar;
