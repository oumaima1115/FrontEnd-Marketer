import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, Tooltip } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarElement, Tooltip);

const SimpleBarChart = ({ dataChart }) => {

    const { authors, likes, descriptions } = dataChart;
    const [selectedDescription, setSelectedDescription] = useState('');

    const data = {
        labels: authors,
        datasets: [{
            label: 'Likes',
            data: likes,
            backgroundColor: '#D7ECFB',
            borderColor: '#40A8ED',
            borderWidth: 1,
            borderRadius: "2"
        }]
    };

    const options = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const likes = context.parsed.y || 0;

                        let tooltipLabel = `${label}: ${likes} `;

                        return tooltipLabel;
                    }
                }
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const likes = data.datasets[0].data[index];
                const description = descriptions[index];
                console.log("Likes:", likes);
                console.log("Description:", description);
                setSelectedDescription(description);
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '400px', width: '100%' }}>
            <div style={{ flex: 1, cursor: "pointer"}}>
                <Bar
                    data={data}
                    options={options}
                />
            </div>
            <div style={{ flex: 1, textAlign: 'center', padding: "2em", overflowY: 'auto', maxHeight: '265px'}}>{selectedDescription}</div>
        </div>
    );
};

export default SimpleBarChart;
