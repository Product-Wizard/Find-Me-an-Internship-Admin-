import * as dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.extend(relativeTime);
const DateTime = {
  dayjs
}


export default DateTime;