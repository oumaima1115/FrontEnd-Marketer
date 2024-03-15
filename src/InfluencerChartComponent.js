import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Typography } from "@mui/material";
import CardHeaderInfo from "./CardHeaderInfo";
// import influencerData from './influencer.json';
import { InstagramIcon, YoutubeIcon, TikTokIcon, TwitterIcon, RedditIcon, LinkedInIcon } from './Icons';
import VerticalBarChart from './verticalBarchart';
import VerticalBarChartList from './VerticalBarChartList';
import "./index.css";

const InfluencerChartComponent = ({ data }) => {
    // const [data, setData] = useState([]);
    const containerRef = useRef(null);
    let tiktokCount = 0;
    let instagramCount = 0;
    let youtubeCount = 0;
    let twitterCount = 0;
    let redditCount = 0;
    let linkedInCount = 0;
    const [activeTheme, setActiveTheme] = useState(null);
    const [theme, setTheme] = useState("");
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState("Select Social Media");
    const [dataChart, setDataChart] = useState({
        authors: [],
        likes: [],
        descriptions: []
    });
    const [dataChartList, setDataChartList] = useState({
        author: "",
        likes: [],
        descriptions: []
    });
    const [authorSelected, setAuthorSelected] = useState(null);
    const [showOptions, setShowOptions] = useState(false);


    // useEffect(() => {
    //     const dataArray = Object.values(influencerData);
    //     setData(dataArray);
    // }, []);

    data.forEach(item => {
        item.documents.forEach(doc => {
            switch (doc.source) {
                case 'tiktok':
                    tiktokCount++;
                    break;
                case 'instagram':
                    instagramCount++;
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
                case 'linkedin':
                    linkedInCount++;
                    break;
                default:
                    break;
            }
        });
    });

    useEffect(() => {
        if (activeTheme) {
            const filteredSources = data
                .filter(item => item.theme === theme)
                .flatMap(item => item.documents.map(doc => doc.source));
            const uniqueSources = Array.from(new Set(filteredSources));
            setSources(uniqueSources);
        }
    }, [activeTheme, data, theme]);

    useEffect(() => {
        if (sources.size > 0) {
            setSelectedSource([...sources][0]);
        }
    }, [sources]);

    useEffect(() => {
        if (selectedSource !== 'tiktok') {
            const filteredData = data
                .filter(item => item.theme === theme)
                .flatMap(item => item.documents)
                .filter(doc => ['youtube', 'twitter', 'reddit', 'linkedin', 'instagram'].includes(doc.source))
                .filter(doc => doc.source === selectedSource);

            const authors = filteredData.map(doc => doc.author);
            const likes = filteredData.map(doc => doc.likes);
            const descriptions = filteredData.map(doc => doc.description);

            setDataChart({
                authors: authors,
                likes: likes,
                descriptions: descriptions
            });

            // console.log("Data:", data);
            // console.log("filteredData:", filteredData);
            // console.log("authors:", authors);
            // console.log("likes:", likes);
            // console.log("descriptions:", descriptions);
        }
    }, [selectedSource, theme, data]);

    useEffect(() => {
        // console.log("Data Chart:", dataChart);
    }, [dataChart]);

    const handleAuthorClick = (author) => {
        setAuthorSelected(author);
        // console.log("Author clicked:", author);
    };

    useEffect(() => {
        if (selectedSource === 'tiktok') {
            const tiktokData = data
                .filter(item => item.theme === theme)
                .flatMap(item => item.documents)
                .filter(doc => doc.source === 'tiktok')
                .filter(doc => doc.author === authorSelected);

            const likes = tiktokData.map(doc => doc.likes);
            const descriptions = tiktokData.map(doc => doc.description);

            setDataChartList({
                author: authorSelected,
                likes: likes[0],
                descriptions: descriptions[0]
            });

            // console.log("likes:", likes[0]);
            // console.log("descriptions:", descriptions[0]);
            // console.log("TikTok Data:", tiktokData);
        }
    }, [authorSelected, selectedSource, theme, data]);

    useEffect(() => {
        // console.log("Data Chart list :", dataChartList);
    }, [dataChartList]);

    const renderTheme = (theme) => {
        setTheme(theme);
        setSelectedSource("Select Social Media");
        // console.log("Theme = ", theme)
        setActiveTheme(true);
    };

    const handleSourceChange = (source) => {
        setSelectedSource(source);
        setShowOptions(false);
    };

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };

    useEffect(() => {
        // console.log("selected Source :", selectedSource);
    }, [selectedSource]);

    const scrollLeft = () => {
        containerRef.current.scrollLeft -= 200;
    };

    const scrollRight = () => {
        containerRef.current.scrollLeft += 200;
    };

    const getWidth = (text) => {
        const averageCharWidth = 10;
        const padding = 32;
        return (text.length * averageCharWidth) + padding;
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
                <h4>Influencers Chart </h4>
                <CardHeaderInfo
                    text="The Influencers Chart displays the top influencers for a specific market or industry. The
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

                {/* Theme */}
                <Box
                    style={{
                        width: "400px",
                        fontSize: "20px",
                        color: "#666666",
                        marginBottom: "1rem",
                        marginLeft: "-7.9em",
                    }}
                >
                    Theme
                </Box>
                <div
                    ref={containerRef}
                    style={{
                        display: "flex",
                        overflowX: "auto",
                        scrollBehavior: "smooth",
                        maxWidth: "100%",
                    }}
                >
                    {data.map((item, index) => (
                        <Button
                            key={index}
                            onClick={() => renderTheme(item.theme)}
                            sx={{
                                bgcolor: "#EDEDED",
                                color: "black",
                                borderRadius: "29px",
                                margin: "0.5rem",
                                whiteSpace: "nowrap",
                                minWidth: "auto",
                                width: getWidth(item.theme) + "px",
                            }}
                        >
                            {item.theme}
                        </Button>
                    ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <Button onClick={scrollLeft}>&#8249;</Button>
                    <Button onClick={scrollRight}>&#8250;</Button>
                </div>

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
                        <InstagramIcon />
                        <Typography variant="body1">Instagram Accounts</Typography>
                        <Typography variant="body1">{instagramCount}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <YoutubeIcon />
                        <Typography variant="body1">YouTube Channels</Typography>
                        <Typography variant="body1">{youtubeCount}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TikTokIcon />
                        <Typography variant="body1">TikTok Accounts</Typography>
                        <Typography variant="body1">{tiktokCount}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TwitterIcon />
                        <Typography variant="body1">Twitter Accounts</Typography>
                        <Typography variant="body1">{twitterCount}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <RedditIcon />
                        <Typography variant="body1">Reddit Accounts</Typography>
                        <Typography variant="body1">{redditCount}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <LinkedInIcon />
                        <Typography variant="body1">LinkedIn Accounts</Typography>
                        <Typography variant="body1">{linkedInCount}</Typography>
                    </Box>
                </Box>

                {/* Best Influencers */}
                {theme && (
                    <>
                        <Box
                            style={{
                                width: "400px",
                                fontSize: "20px",
                                color: "#666666",
                                marginBottom: "1rem",
                                marginLeft: "-6em",
                            }}
                        >
                            Best Influencers
                        </Box>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Box style={{ marginTop: 'right' }}>
                                {activeTheme && selectedSource !== 'Select Social Media' && selectedSource !== 'tiktok' && (
                                    <div>
                                        <VerticalBarChart dataChart={dataChart} />
                                    </div>
                                )}

                                {activeTheme && selectedSource === 'tiktok' && (
                                    <div>
                                        <div
                                            style={{
                                                display: "flex",
                                                overflowX: "auto",
                                                scrollBehavior: "smooth",
                                                maxWidth: "100%",
                                                gap: "2.2em",
                                                padding: "1em",
                                                // marginTop: "-3em"
                                            }}
                                        >
                                            {data
                                                .filter(item => item.theme === theme)
                                                .flatMap(item => item.documents)
                                                .filter(doc => doc.source === 'tiktok')
                                                .map((doc, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            marginRight: "20px",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() => handleAuthorClick(doc.author)}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "50px",
                                                                height: "50px",
                                                                borderRadius: "50%",
                                                                backgroundColor: index % 2 === 0 ? "#F5BCFF" : "#9662FF",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center"
                                                            }}
                                                        >
                                                            <p style={{ margin: 0, fontSize: "24px", color: "white" }}>{doc.author.charAt(0).toUpperCase()}</p>
                                                        </div>
                                                        <p style={{ margin: "5px 0 0 0" }}>{doc.author}</p>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                                {activeTheme && authorSelected && selectedSource !== 'Select Social Media' && selectedSource === 'tiktok' && (
                                    <div>
                                        <VerticalBarChartList dataChart={dataChartList} />
                                    </div>
                                )}
                            </Box>
                            <Box style={{ textAlign: 'left' }}>
                                {activeTheme && (
                                    sources.size === 0 ? (
                                        <p>No sources available</p>
                                    ) : (
                                        <>
                                            <div className="selector">
                                                <div id="selectField" onClick={handleToggleOptions}>
                                                    <p id="selectText">{selectedSource}</p>
                                                    <img id="arrowIcon" src="https://cdn.icon-icons.com/icons2/1339/PNG/512/downarrow_87468.png" alt="inf" className={showOptions ? 'rotate' : ''} />
                                                </div>
                                                <ul id="list" className={showOptions ? '' : 'hide'}>
                                                    {sources.includes('instagram') && (
                                                        <li className="options" onClick={() => handleSourceChange('instagram')}>
                                                            <img src="https://freelogopng.com/images/all_img/1658586823instagram-logo-transparent.png" alt="" />
                                                            <p className="socialName">Instagram</p>
                                                        </li>
                                                    )}
                                                    {sources.includes('youtube') && (
                                                        <li className="options" onClick={() => handleSourceChange('youtube')}>
                                                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" alt="" />
                                                            <p className="socialName">Youtube</p>
                                                        </li>
                                                    )}
                                                    {sources.includes('tiktok') && (
                                                        <li className="options" onClick={() => handleSourceChange('tiktok')}>
                                                            <img src="https://freelogopng.com/images/all_img/1655891735tiktok-png-icon.png" alt="" />
                                                            <p className="socialName">TikTok</p>
                                                        </li>
                                                    )}
                                                    {sources.includes('twitter') && (
                                                        <li className="options" onClick={() => handleSourceChange('twitter')}>
                                                            <img src="https://freelogopng.com/images/all_img/1657043345twitter-logo-png.png" alt="" />
                                                            <p className="socialName">Twitter</p>
                                                        </li>
                                                    )}
                                                    {sources.includes('reddit') && (
                                                        <li className="options" onClick={() => handleSourceChange('reddit')}>
                                                            <img src="https://freelogopng.com/images/all_img/1658834095reddit-logo-png.png" alt="" />
                                                            <p className="socialName">Reddit</p>
                                                        </li>
                                                    )}
                                                    {sources.includes('linkedin') && (
                                                        <li className="options" onClick={() => handleSourceChange('linkedin')}>
                                                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="" />
                                                            <p className="socialName">Linkedin</p>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </>
                                    )
                                )}
                            </Box>
                        </div>
                    </>
                )}
            </Box>
        </Box >
    );
};

export default InfluencerChartComponent;
