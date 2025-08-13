import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function SonarrCalendar({ events }) {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={["month", "week", "day", "agenda"]}
        defaultDate={new Date()}
        defaultView="month"
      />
    </div>
  );
}

export default SonarrCalendar;
