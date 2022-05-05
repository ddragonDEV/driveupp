import {
    Box,
    Card,
    Typography
} from '@mui/material';
import { useInformation } from '../information/useInformation';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { format } from "date-fns";
import DatePicker, { DateObject } from "react-multi-date-picker";


export const SessionsChart = () => {
    const { getAnalyticsSessions, sessionPerDay } = useInformation();
    const [startDate, setstartDate] = useState(new DateObject().add(-10, "day"));
    const [endDate, sendDate] = useState(new DateObject());

    useEffect(async () => {
        await getAnalyticsSessions({
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
        });
    }, [startDate, endDate]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: '* Incluyen las conexiones de mecánicos y usuarios, pero no las del administrador',
            },
        },
    };

    const labels = [...sessionPerDay.map(day => format(new Date(day?.date), "yyyy-MM-dd"))];

    const data = {
        labels,
        datasets: [
            {
                label: 'Número de conexiones',
                data: [...sessionPerDay.map(day => day.totalSessions || 0)],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };


    return (
        <>
            <Card >
                <Box sx={{ mt: 4, pr: 4, pl: 4, width: "100%" }} display="flex" justifyContent="center">
                    <Typography variant="h5">Usuarios conectados por día</Typography>
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
                    {typeof window !== "undefined" && <Line options={options} data={data} />}
                </Box>
                <br />
            </Card>
        </>
    );
};;;