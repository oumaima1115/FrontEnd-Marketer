import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement, Tooltip } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarElement, Tooltip);

const LeadsBarChart = ({ dataChart }) => {
    const [selectedSource, setSelectedSource] = useState('');
    const sources = [...new Set(dataChart.map(text => text.source))];
    const allTexts = dataChart.map(text => ({ text: text.text, author: text.author, source: text.source }));

    const authorCountsPerSource = sources.map(source => ({
        source: source,
        authorCount: dataChart.filter(text => text.source === source).length
    }));
    const authorCounts = authorCountsPerSource.map(item => item.authorCount);

    const data = {
        labels: sources,
        datasets: [{
            label: 'Authors Per Source',
            data: authorCounts,
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
                const sourceSelect = sources[index];
                setSelectedSource(sourceSelect);
            } else {
                setSelectedSource('');
            }
        }
    };

    useEffect(() => {
        setSelectedSource('');
    }, [dataChart]);

    return (
        <div style={{ display: 'flex', width: '97%' }}>
            <div style={{ flex: '1', marginRight: '82px' }}>
                <div style={{ width: '500px', height: '400px' }}>
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>
            </div>
            <div style={{ flex: '2', maxHeight: "261px", overflowY: "auto" }}>
                {selectedSource && (
                    <>
                        <ul style={{ padding: 0 }}>
                            {allTexts
                                .filter(text => text.source === selectedSource)
                                .map((text, index) => (
                                    <li key={index} style={{ listStyle: "none", display: "flex", alignItems: "flex-start", marginBottom: "10px" }}>
                                        <div
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                backgroundColor: index % 2 === 0 ? "#F5BCFF" : "#9662FF",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexShrink: 0,
                                                marginRight: "10px"
                                            }}
                                        >
                                            <p style={{ margin: 0, fontSize: "24px", color: "white" }}>{text.author.charAt(0).toUpperCase()}</p>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <strong style={{ marginBottom: "5px", textAlign: "left", alignSelf: "flex-start" }}>{text.author}</strong>
                                            <p style={{ margin: 0, textAlign: "left", alignSelf: "flex-start" }}>{text.text}</p>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </>
                )}
            </div>


        </div>
    );
};

export default LeadsBarChart;
