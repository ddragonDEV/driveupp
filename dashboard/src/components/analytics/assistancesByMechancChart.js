import { Box, Card, Typography } from '@mui/material';
import { useInformation } from '../information/useInformation';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DatePicker, { DateObject } from "react-multi-date-picker";


export const AssistanceByMechanicChart = () => {
    const { getAnalyticsAssistanceMechanic, assistancesByMechanic } = useInformation();
    const [startDate, setstartDate] = useState(new DateObject().add(-10, "day"));
    const [endDate, sendDate] = useState(new DateObject());

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(async () => {
        await getAnalyticsAssistanceMechanic({
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
        });
    }, [startDate, endDate]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total de apoyos en los que estuvo involucrado',
            },
        },
    };

    const labels = [...assistancesByMechanic.map(assistanceInfo => assistanceInfo?.fullName)];
    const data = {
        labels,
        datasets: [
            {
                label: 'Número de asistencias',
                data: [...assistancesByMechanic.map(assistanceInfo => assistanceInfo?.totalAssistances)],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };



    return (
        <>
            <Card >
                <Box sx={{ mt: 4, pr: 4, pl: 4, width: "100%" }} display="flex" justifyContent="center">
                    <Typography variant="h5">Total de asistencias por mecánico</Typography>
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
                    {typeof window !== "undefined" && <Bar options={options} data={data} />}
                </Box>
                <br />
            </Card>
        </>
    );
};;;