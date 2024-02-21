import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import dayjs from "dayjs";
import './App.css';


function App() {

  const [value, setValue] = useState(dayjs())

  useEffect(() => {
    setValue(dayjs('2024-2-6'))
  },[])

  return (
    <div className="App">
      <Calendar value={value} />
    </div>
  );
}

export default App;
