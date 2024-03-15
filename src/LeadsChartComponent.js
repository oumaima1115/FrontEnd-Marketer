import React, { useState, useEffect } from 'react';
import { Box, Typography, Tooltip } from "@mui/material";
import CardHeaderInfo from "./CardHeaderInfo";
import { GoogleIcon, YoutubeIcon, TikTokIcon, TwitterIcon, RedditIcon } from './Icons';
import LeadsBarChart from './leadsBarChart';
import "./index.css";

const LeadsChartComponent = ({ data }) => {
    let tiktokCount = 0;
    let googleCount = 0;
    let youtubeCount = 0;
    let twitterCount = 0;
    let redditCount = 0;
    const maxLength = 186;
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [clickedIndex, setClickedIndex] = useState(null);
    const [texts, setTexts] = useState([]);

    useEffect(() => {
        console.log("Texts:", texts);
    }, [texts]);

    data.forEach(item => {
        item.texts.forEach(doc => {
            switch (doc.source) {
                case 'tiktok':
                    tiktokCount++;
                    break;
                case 'google':
                    googleCount++;
                    break;
                case 'youtube':
                    youtubeCount++;
                    break;
                case 'twitter':
                    twitterCount++;
                    break;
                case 'reddit':
                    redditCount++;
                    break;
                default:
                    break;
            }
        });
    });

    const handleLineClick = (index, texts) => {
        if (clickedIndex === index) {
            setClickedIndex(null);
            setTexts(null)
        } else {
            setClickedIndex(index);
            setTexts(texts)
        }
        console.log("Clicked index:", index);
    };

    return (
        <Box
            sx={{
                overflow: "hidden",
                backgroundColor: "white",
                boxShadow: "0px 0.5px 1.75px rgba(0, 0, 0, 0.039), 0px 1.85px 6.25px rgba(0, 0, 0, 0.19)",
                borderRadius: "4px",
                margin: "2rem"
            }}
        >
            <Box className="card_heading">
                <h4>Leads Chart </h4>
                <CardHeaderInfo
                    text="The Leads Chart displays the top leads interests for a specific market or industry. The
                    chart compares each competitor&#39;s market share and popularity, allowing you to quickly and
                    easily compare and contrast the strengths and weaknesses of each company by comparing
                    their domain authority, page authority, number of backlinks and spam scores."
                />
            </Box>
            <Box
                className="card_body"
                sx={{
                    backgroundColor: "white",
                    padding: "1rem",
                    width: "100%",
                }}
            >

                {/* Overview */}
                <Box
                    style={{
                        width: "400px",
                        fontSize: "20px",
                        color: "#666666",
                        marginBottom: "1rem",
                        marginLeft: "-7.3em",
                    }}
                >
                    Overview
                </Box>
                <Box
                    className="social_media_stats"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7rem",
                        marginBottom: "1rem",
                        marginLeft: "2em"
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <GoogleIcon />
                        <Typography variant="body1">Google Results</Typography>
                        <Typography variant="body1">{googleCount}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <YoutubeIcon />
                        <Typography variant="body1">YouTube Results</Typography>
                        <Typography variant="body1">{youtubeCount}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TikTokIcon />
                        <Typography variant="body1">TikTok Results</Typography>
                        <Typography variant="body1">{tiktokCount}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TwitterIcon />
                        <Typography variant="body1">Twitter Results</Typography>
                        <Typography variant="body1">{twitterCount}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <RedditIcon />
                        <Typography variant="body1">Reddit Results</Typography>
                        <Typography variant="body1">{redditCount}</Typography>
                    </Box>
                </Box>
                {/* Interests */}
                <Box
                    style={{
                        width: "400px",
                        fontSize: "20px",
                        color: "#666666",
                        marginBottom: "1rem",
                        marginLeft: "-7.3em",
                    }}
                >
                    Interestes
                </Box>
                <Box style={{
                    maxHeight: '200px',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    WebkitScrollbarWidth: 'thin',
                }}>
                    <div className="array-container">
                        {data.map((line, index) => {
                            const isTruncated = line.interests.length > maxLength;
                            const displayLine = isTruncated ? (line.interests.slice(0, maxLength).replace(/\s+$/, '') + '...') : line.interests;
                            const isClicked = clickedIndex === index;
                            const showArrow = hoveredIndex === index || isClicked;

                            return (
                                <Tooltip key={index} title={line.interests}>
                                    <div
                                        className={`list-item white-line ${isClicked ? 'clicked' : ''}`}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={() => handleLineClick(index, line.texts)}
                                    >
                                        {displayLine}
                                        {showArrow && <img src="https://cdn.icon-icons.com/icons2/933/PNG/512/keyboard-right-arrow-button-1_icon-icons.com_72690.png" alt="arrow" className={`arrow-icon ${isClicked ? 'rotate clicked' : 'rotate'}`} />}
                                    </div>
                                </Tooltip>
                            );
                        })}
                    </div>
                </Box>
                {/* Leads Chart */}
                {clickedIndex !== null && (
                    <>
                        <Box
                            style={{
                                width: "400px",
                                fontSize: "20px",
                                color: "#666666",
                                marginBottom: "1rem",
                                marginLeft: "-7.3em",
                            }}
                        >
                            Leads Chart
                        </Box>
                        <Box>
                            <LeadsBarChart dataChart={texts} />
                        </Box>
                    </>
                )}
            </Box>
        </Box >
    );
};

export default LeadsChartComponent;