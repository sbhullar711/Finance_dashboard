import {useState} from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import AssessmentIcon from '@mui/icons-material/Assessment';
const Navbar = () => {
    const { palette }=useTheme();
    const [selected,setSelected]= useState("dashboard")
    return <FlexBetween  mb="0.25rem" p="0.5rem 0rem" color={palette.grey[100]}>
        {/* LEFT SIDE*/}
        <FlexBetween gap="0.75rem">
            <AssessmentIcon sx= {{ fontSize: "48px"}}/>
            <Typography
                variant="h1" fontSize="16 px"> BullCharts
            </Typography> 

        </FlexBetween>
        {/* RIGHT SIDE*/}
        <FlexBetween gap="2rem">
            <Box sx={{ "&: hover" : { color: palette.primary[100]}}}>{/* select when its hovered*/}
                <Link
                    to="/"
                    onClick={()=> setSelected("dashboard")}   
                    style= {{ color: selected === "dashboard" ? " inherit": palette.grey[700], textDecoration: "inherit"
                           }}
                           >
                        Dashboard
                </Link>

            </Box> 



            <Box sx={{ "&: hover" : { color: palette.primary[100]}}}>{/* select when its hovered*/}
                <Link
                    to="/settings"
                    onClick={()=> setSelected("settings")}   
                    style= {{ color: selected === "settings" ? " inherit": palette.grey[700], textDecoration: "inherit"
                           }}
                           >
                        Settings
                </Link>

            </Box> 


        </FlexBetween>

    </FlexBetween>;
};

export default Navbar;