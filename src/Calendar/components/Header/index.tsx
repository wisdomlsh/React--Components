import React, { useContext } from "react";
import type { Dayjs } from "dayjs";
import allLocales from "../../locale";
import LocaleContext from "../../LocaleContext";
import "./index.scss";


interface HeaderProps {
  curMonth: Dayjs
  preMonthHandle?: () => void
  nextMonthHandle?: () => void
  todayHandle?: () => void
}

const Header: React.FC<HeaderProps> = (props) => {

  const { curMonth, preMonthHandle, nextMonthHandle, todayHandle } = props;

  const localeContext = useContext(LocaleContext)
  const CalendarLocale = allLocales[localeContext.locale]

  return <div className="calendar-header">
    <div className="calendar-header-left">
      <div className="calendar-header-icon" onClick={preMonthHandle}>&lt;</div>
      <div className="calendar-header-value">{curMonth?.format(CalendarLocale.formatMonth)}</div>
      <div className="calendar-header-icon" onClick={nextMonthHandle}>&gt;</div>
      <button className="calendar-header-btn" onClick={todayHandle}>{CalendarLocale.today}</button>
    </div>
  </div>
}

export default Header
