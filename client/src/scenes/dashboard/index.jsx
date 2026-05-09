import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import CircularProgress from "@mui/material/CircularProgress";
import {
	DownloadOutlined,
	Email,
	PointOfSale,
	PersonAdd,
	Traffic,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetRoyaltiesQuery } from "state/api";
import StatBox from "components/StatBox";

/**
 * Dashboard Component
 * The main entry point for the TCC Dashboard.
 * Displays key metrics, sales overview, and category breakdowns.
 */
const Dashboard = () => {
	const theme = useTheme();
	const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
	
	// Fetch royalty data from the RTK Query API
	const { data, isLoading } = useGetRoyaltiesQuery();

	// Loading state with a centered spinner
	if (isLoading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100vh"
			>
				<CircularProgress />
			</Box>
		);
	}

	// Month constants for data indexing
	const months = [
		"JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
		"JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
	];

	const currentMonthIndex = new Date().getMonth();
	const currentMonth = months[currentMonthIndex];
	const previousMonth = currentMonthIndex === 0 ? months[11] : months[currentMonthIndex - 1];

	// Data calculations
	const yearlyRoyaltiesTotal = Math.round(
		data.reduce((sum, item) => sum + (item.TOTAL || 0), 0)
	);

	const monthlyRoyalties = Math.round(
		data.reduce((sum, item) => sum + (Number(item[currentMonth]) || 0), 0)
	);

	const previousMonthRoyalties = data.reduce(
		(sum, item) => sum + (Number(item[previousMonth]) || 0),
		0
	);

	// Calculate growth metrics
	let percentageIncrease = 0;
	if (previousMonthRoyalties > 0) {
		percentageIncrease = ((monthlyRoyalties - previousMonthRoyalties) / previousMonthRoyalties) * 100;
	}

	const formattedYearlyRoyalties = `$${yearlyRoyaltiesTotal.toLocaleString()}`;
	const formattedMonthlyRoyalties = `$${monthlyRoyalties.toLocaleString()}`;
	const formattedPercentageIncrease = `${percentageIncrease.toFixed(2)}%`;

	return (
		<Box m="1.5rem 2.5rem">
			<FlexBetween>
				<Header title="DASHBOARD" subtitle="Operational overview for TCC" />

				<Box>
					<Button
						sx={{
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.background.alt,
							fontSize: "14px",
							fontWeight: "bold",
							padding: "10px 20px",
						}}
					>
						<DownloadOutlined sx={{ mr: "10px" }} />
						Download Reports
					</Button>
				</Box>
			</FlexBetween>

			<Box
				mt="20px"
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="160px"
				gap="20px"
				sx={{
					"& > div": {
						gridColumn: isNonMediumScreens ? undefined : "span 12",
					},
				}}
			>
				{/* KPI Cards */}
				<StatBox
					title="Total Royalties YTD"
					value={formattedYearlyRoyalties}
					description="Accumulated revenue for the current year"
					icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
				/>
				<StatBox
					title="Monthly Performance"
					value={formattedMonthlyRoyalties}
					increase={formattedPercentageIncrease}
					description="Since last month"
					icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
				/>
				
				{/* Sales Overview Chart */}
				<Box
					gridColumn="span 8"
					gridRow="span 2"
					backgroundColor={theme.palette.background.alt}
					p="1rem"
					borderRadius="0.55rem"
				>
					<OverviewChart view="sales" isDashboard={true} />
				</Box>

				<StatBox
					title="Yearly Projections"
					value="N/A"
					description="Projected based on current trends"
					icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
				/>
				<StatBox
					title="New Clients"
					value="N/A"
					description="Acquisition this month"
					icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
				/>

				{/* Airtable Integration */}
				<Box
					gridColumn="span 8"
					gridRow="span 3"
					sx={{
						"& .MuiDataGrid-root": { border: "none", borderRadius: "5rem" },
						"& .MuiDataGrid-cell": { borderBottom: "none" },
						"& .MuiDataGrid-columnHeaders": {
							backgroundColor: theme.palette.background.alt,
							color: theme.palette.secondary[100],
							borderBottom: "none",
						},
						"& .MuiDataGrid-virtualScroller": { backgroundColor: theme.palette.background.alt },
						"& .MuiDataGrid-footerContainer": {
							backgroundColor: theme.palette.background.alt,
							color: theme.palette.secondary[100],
							borderTop: "none",
						},
					}}
				>
					<iframe
						className="airtable-embed"
						src="https://airtable.com/embed/appOUWo1JV78OIjRW/shrfbIJEiLsuilBtL?backgroundColor=green&viewControls=on"
						frameBorder="0"
						width="100%"
						height="100%"
						style={{ background: "transparent", border: "1px solid #ccc" }}
						title="Airtable Data View"
					></iframe>
				</Box>

				{/* Categorical Breakdown */}
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={theme.palette.background.alt}
					p="1.5rem"
					borderRadius="0.55rem"
				>
					<Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
						Royalties By Category
					</Typography>
					<BreakdownChart isDashboard={true} />
					<Typography p="0 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
						Detailed breakdown of revenue distribution across product categories.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
