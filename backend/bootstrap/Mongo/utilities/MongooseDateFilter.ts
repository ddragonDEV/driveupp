import dayjs from "dayjs";

export const dateQueryFilter = (dates: Dates): ValidDatesForQuery => {
    if (dates.startDate === "") dates.startDate = undefined;
    if (dates.endDate === "") dates.endDate = undefined;

    return {
        startDate: dayjs(dates.startDate ?? "2022-01-01")
            .hour(0)
            .minute(0)
            .second(0)
            .toDate(),
        endDate: dates?.endDate ? dayjs(dates.endDate).hour(23).minute(59).second(59).toDate() : dayjs().toDate()
    };
};

interface Dates {
    startDate: string | undefined;
    endDate: string | undefined;
}

interface ValidDatesForQuery {
    startDate: Date;
    endDate: Date;
}


export class Period {
    startDate: string | undefined;
    endDate: string | undefined;
}