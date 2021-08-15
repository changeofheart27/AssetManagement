import React, {useState} from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

const SelectDate = ({setSelectDate}) => {
    const [value, onChange] = useState(new Date());
    setSelectDate(moment(value).format('DD/MM/YYYY'));
    return (
        <Calendar
            onChange={onChange}
            value={value}
        >
        </Calendar>
    );
};

export default SelectDate;