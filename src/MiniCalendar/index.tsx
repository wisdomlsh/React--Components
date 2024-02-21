import React, { useState, useImperativeHandle } from 'react';
import './index.scss';

interface CalendarProps {
  value?: Date
  onChange?: (date: Date) => void

}
interface CalendarRef {
  getDate: () => Date
  setDate: (date: Date) => void
}

const Calendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props, ref) => {

  const { value = new Date(), onChange } = props

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date
      },
      setDate(date) {
        setDate(date)
      }
    }
  })

  const [date, setDate] = useState<Date>(value)


  const handlePreMounth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }
  const handleNextMounth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  // 计算出当月有多少天
  const currentDaysOfMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

  // 计算出上月有多少天
  const preDaysOfMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

  // 计算当前月的第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  // 计算当前月的最后一天是星期几
  const lastDayOfMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDay();

  const renderDays = () => {

    const days = []

    const currentMonthDay = currentDaysOfMonth(date.getFullYear(), date.getMonth())
    let preMonthDay = preDaysOfMonth(date.getFullYear(), date.getMonth())
    const firstMonthDay = firstDayOfMonth(date.getFullYear(), date.getMonth())
    const lastMonthDay = lastDayOfMonth(date.getFullYear(), date.getMonth())
    

    for (let i = 0; i < firstMonthDay; i++) {
      // days.push(<div key={`empty-${i}`} className="empty"></div>)
      days.push(<div key={`empty-${i}`} className="day gray">{preMonthDay - (firstMonthDay - 1) + i}</div>)

    }
    for (let i = 1; i <= currentMonthDay; i++) {
      const clickHandler = onChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i))
      if (i === date.getDate()) {
        days.push(<div key={`day-${i}`} className="day checkout" onClick={clickHandler}>{i}</div>)
      } else {
        days.push(<div key={`day-${i}`} className="day" onClick={clickHandler}>{i}</div>)
      }
    }

    for (let i = 0; i < 6 - lastMonthDay; i++) {      
      days.push(<div key={`gray-${i}`} className="day gray">{i + 1}</div>)
    }
    return days
  };




  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePreMounth}>&lt;</button>
        <div>{`${date.getFullYear()}年${date.getMonth() + 1}月`}</div>
        <button onClick={handleNextMounth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>

        {renderDays()}
      </div>
    </div>
  );
}

export default React.forwardRef(Calendar);
