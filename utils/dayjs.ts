import baseDayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import "dayjs/locale/id";

baseDayjs.extend(utc);
baseDayjs.extend(timezone);
baseDayjs.extend(localizedFormat);
baseDayjs.extend(isoWeek);
baseDayjs.extend(isSameOrAfter);
baseDayjs.extend(isSameOrBefore);
baseDayjs.locale('id');

export const dayjs = baseDayjs;