import { Box, Card, Typography } from '@mui/material';
import { useInformation } from '../information/useInformation';
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { randomColor } from 'src/helpers/randomColor';


export const ZoneAssistanceChart = () => {
    const { getAnalyticsAssistanceZone, assistancesByZone } = useInformation();
    const [startDate, setstartDate] = useState(new DateObject().add(-10, "day"));
    const [endDate, sendDate] = useState(new DateObject());
    Chart.register(ArcElement);

    useEffect(async () => {
        await getAnalyticsAssistanceZone({
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
        });
    }, [startDate, endDate]);


    const labels = [...assistancesByZone.map(zoneInfo => {
        if (zoneInfo?.postalCode === null) return "Código postal desconocido";
        return `C.P. ${ zoneInfo?.postalCode }`;
    })];
    const data = {
        labels,
        datasets: [
            {
                label: 'Asistencias por zona',
                data: [...assistancesByZone.map(zoneInfo => zoneInfo?.totalAssistances || 0)],
                backgroundColor: [...assistancesByZone.map(zone => randomColor())],
            }
        ],
    };


    return (
        <>
            <Card >
                <Box sx={{ mt: 4, pr: 4, pl: 4, width: "100%" }} display="flex" justifyContent="center">
                    <Typography variant="h5">Asistencias por zona (Código postal)</Typography>
                    <Box sx={{ pr: 4, pl: 4, width: "100%" }}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        Inicio: <DatePicker value={startDate} onChange={setstartDate} />
                        Término: <DatePicker value={endDate} onChange={sendDate} />
                    </Box>
                </Box>
                <Box sx={{ pr: 4, pl: 4, width: "100%" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box sx={{ pr: 4, pl: 4, width: "65%" }}>
                        {typeof window !== "undefined" && <Pie data={data} options={{ responsive: true }} />}
                    </Box>
                </Box>
                <br />
            </Card>
        </>
    );
};;;