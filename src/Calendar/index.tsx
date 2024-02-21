import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import MonthCalendar from "./components/MonthCalendar";
import Header from "./components/Header";
import type { Dayjs } from 'dayjs';
import cs from "classnames";
import LocaleContext from "./LocaleContext";
import './index.scss';
import dayjs from 'dayjs';



export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}


const Calendar: React.FC<CalendarProps> = (props) => {

  const { value, className, style, locale, onChange } = props

  const classNames = cs('calendar', className)

  const [curValue, setCurValue] = useState<Dayjs>(value)

  const [curMonth, setCurMonth] = useState<Dayjs>(value)

  // 重复逻辑抽离
  function changeState(date: Dayjs) {
    setCurMonth(date)
    setCurValue(date)
    onChange?.(date)
  }

  function selectHandler(date: Dayjs) {
    changeState(date)
  }
  function preMonthHandle() {
    setCurMonth(curMonth.subtract(1, 'month'))
  }

  function nextMonthHandle() {
    setCurMonth(curMonth.add(1, 'month'))
  }

  function todayHandle() {
    const date = dayjs(new Date())
    changeState(date)
  }

  // useEffect(() => {
  //   setCurValue(value)
  // }, [props?.value])


  return (
    <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
      <div className={classNames} style={style}>
        <Header curMonth={curMonth} preMonthHandle={preMonthHandle} nextMonthHandle={nextMonthHandle} todayHandle={todayHandle} />
        <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandle={selectHandler} />
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
