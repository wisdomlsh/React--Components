import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import dayjs from "dayjs";
import './App.css';
// import ErrorBoundary from "./ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import IconAdd  from "./Icon/Icons";
import IconFont  from "./Icon/Icons/create";


function App() {

  const [value, setValue] = useState(dayjs())

  useEffect(() => {
    setValue(dayjs('2024-2-6'))
  }, [])

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={({ error }) => {
        return <div>
          <p>出错了：</p>
          <div>{error.message}</div>
        </div>
      }}>

        <Calendar value={value} />
        <IconAdd spin/>
        <IconFont type="icon-xing"/> 
      </ErrorBoundary>

    </div>
  );
}

export default App;
