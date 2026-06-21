import dayjs from "dayjs";

export const getDayName = (date: string | Date): string => {
    const day = dayjs(date).locale("id").format("dddd");

    return day.charAt(0).toUpperCase() + day.slice(1);
};