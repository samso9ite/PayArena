import React, { useState, useEffect } from 'react';
import { Line, Column, Bar, Pie } from '@ant-design/plots';
import { EmptyStateComp } from '.';

export function DashboardChart(props) {
	const [data, setData] = useState([]);

	useEffect(() => {
		// setData(props?.chartData?.week_record || [])
		// setData([
		//   {
		//     "date": "2018/8/1",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 4623
		//   },
		//   {
		//     "date": "2018/8/1",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 2208
		//   },
		//   {
		//     "date": "2018/8/2",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 6145
		//   },
		//   {
		//     "date": "2018/8/2",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 2016
		//   },
		//   {
		//     "date": "2018/8/3",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 508
		//   },
		//   {
		//     "date": "2018/8/3",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 2916
		//   },
		//   {
		//     "date": "2018/8/4",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 6268
		//   },
		//   {
		//     "date": "2018/8/4",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 4512
		//   },
		//   {
		//     "date": "2018/8/5",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 6411
		//   },
		//   {
		//     "date": "2018/8/5",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 8281
		//   },
		//   {
		//     "date": "2018/8/6",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 1890
		//   },
		//   {
		//     "date": "2018/8/6",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 2008
		//   },
		//   {
		//     "date": "2018/8/7",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 4251
		//   },
		//   {
		//     "date": "2018/8/7",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 1963
		//   },
		//   {
		//     "date": "2018/8/8",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 2978
		//   },
		//   {
		//     "date": "2018/8/8",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 2367
		//   },
		//   {
		//     "date": "2018/8/9",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 3880
		//   },
		//   {
		//     "date": "2018/8/9",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 2956
		//   },
		//   {
		//     "date": "2018/8/10",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 3606
		//   },
		//   {
		//     "date": "2018/8/10",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 678
		//   },
		//   {
		//     "date": "2018/8/11",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 4311
		//   },
		//   {
		//     "date": "2018/8/11",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 3188
		//   },
		//   {
		//     "date": "2018/8/12",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 4116
		//   },
		//   {
		//     "date": "2018/8/12",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 3491
		//   },
		//   {
		//     "date": "2018/8/13",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 6419
		//   },
		//   {
		//     "date": "2018/8/13",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 2852
		//   },
		//   {
		//     "date": "2018/8/14",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 1643
		//   },
		//   {
		//     "date": "2018/8/14",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 4788
		//   },
		//   {
		//     "date": "2018/8/15",
		//     "type": "API Verification",
		//     "value": 0
		//     // "value": 445
		//   },
		//   {
		//     "date": "2018/8/15",
		//     "type": "Bulk Verification",
		//     "value": 0
		//     // "value": 4319
		//   },
		// ])
	}, []);

	const config = {
		data: (props?.chartData?.week_record || []),
		xField: 'date',
		yField: 'value',
		seriesField: 'type',
		yAxis: {
			label: {
				formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
			},
		},
		color: ['#027A48', '#D92D20'],
		smooth: true,
	};

	return <Line {...config} />;
};

export const ReportOverviewChart = (props) => {
	const [arr, setArr] = useState([])
	
	let combinedArr = arr

	useEffect(() => {
		if(arr.length < 1 || props.tag === "Identitypass"){
			triggerChartData()
		}
	}, [arr, props.data, props.tag])
	

	let triggerChartData= ()=>{
		console.log(props?.data);
		props?.data?.verified_data?.forEach((dat) => {
			var rightIndex = combinedArr.findIndex((rep) => (rep?.date === dat?.date) && (rep?.type === "VERIFIED"))
	
			if (rightIndex !== -1) {
				combinedArr.splice(rightIndex, 1)
				combinedArr.push(dat)
			}else {
				combinedArr.push(dat)
			}
		})
	
		props?.data?.fail_data?.forEach((dat) => {
			var rightIndex = combinedArr.findIndex((rep) => (rep?.date === dat?.date) && (rep?.type === "FAILED"))
	
			if (rightIndex !== -1) {
				combinedArr.splice(rightIndex, 1)
				combinedArr.push(dat)
			}else {
				combinedArr.push(dat)
			}
		})
		setArr(combinedArr)
	}

	let data = combinedArr?.sort((a, b) => (b?.date?.replaceAll("/","-") - a?.date?.replaceAll("/","-")));

	// 	{ "city": "00:00", "type": "Verified ID", "value": 0 },
	// 	{ "city": "00:00", "type": "Fake ID", "value": 0 },
	// ]

	const config = {
		data,
		xField: 'date',
		yField: 'value',
		seriesField: 'type',
		isGroup: true,
		columnStyle: {
			radius: [20, 20, 0, 0],
		},
		color: ['#027A48', '#E95470'],
		minColumnWidth: 3,
		maxColumnWidth: 7,
		dodgePadding: 5
	};

	return <Column {...config} />;
};


export const CustomerReportOverviewChart = (props) => {
	const [arr, setArr] = useState([])
	
	let combinedArr = arr

	useEffect(() => {
		if(arr.length < 1 || props.tag === "Customer" ){
			triggerChartData()
		}
	}, [arr, props.data, props.tag])
	

	let triggerChartData= ()=>{

		props?.data?.verified_data?.forEach((dat) => {
			var rightIndex = combinedArr.findIndex((rep) => (rep?.date === dat?.date) && (rep?.type === "VERIFIED"))
	
			if (rightIndex !== -1) {
				combinedArr.splice(rightIndex, 1)
				combinedArr.push(dat)
			}else {
				combinedArr.push(dat)
			}
		})
	
		props?.data?.fail_data?.forEach((dat) => {
			var rightIndex = combinedArr.findIndex((rep) => (rep?.date === dat?.date) && (rep?.type === "FAILED"))
	
			if (rightIndex !== -1) {
				combinedArr.splice(rightIndex, 1)
				combinedArr.push(dat)
			}else {
				combinedArr.push(dat)
			}
		})
		setArr(combinedArr)
	}

	let data = combinedArr?.sort((a, b) => (b?.date?.replaceAll("/","-") - a?.date?.replaceAll("/","-")));

	// 	{ "city": "00:00", "type": "Verified ID", "value": 0 },
	// 	{ "city": "00:00", "type": "Fake ID", "value": 0 },
	// ]

	const config = {
		data,
		xField: 'date',
		yField: 'value',
		seriesField: 'type',
		isGroup: true,
		columnStyle: {
			radius: [20, 20, 0, 0],
		},
		color: ['#027A48', '#E95470'],
		minColumnWidth: 3,
		maxColumnWidth: 7,
		dodgePadding: 5
	};

	return <Column {...config} />;
};


export const ReportEndpointsChart = (props) => {
	const data = [
        // {
        //     endpointName:"Drivers License",
        //     apiCalls:"145",
        //     percent:"42.15"
        // },
        // {
        //     endpointName:"International Passport",
        //     apiCalls:"61",
        //     percent:"17.73"
        // },
        // {
        //     endpointName:"Voters Card",
        //     apiCalls:"52",
        //     percent:"15.11"
        // },
        // {
        //     endpointName:"Phone number",
        //     apiCalls:"48",
        //     percent:"13.95"
        // },
        // {
        //     endpointName:"National Identification Number",
        //     apiCalls:"38",
        //     percent:"11.04"
        // },

	];
	return(
		<div>
			<h5>{props?.title}</h5>
			{data?.map((val,i)=>(
				<div className="report-endpoint-chart-area mt-3" key={i}>
					<h6>{val?.endpointName}</h6>
					<div className="row">
						<div className="col-md-8">
							<div className="report-endpoint-chart">
								<div style={{width:`${val?.percent}%`}} className="report-endpoint-chart-progress" />
							</div>
						</div>
						<div className="col-md-4">
							<p>{val?.apiCalls} calls</p>
						</div>
					</div>
				</div>
			))}

			{data?.length < 1 &&
				<div className="my-5 py">
					<EmptyStateComp title={"No data yet"}
						ctaAction={()=>{}}
						desc={"You will see your most used endpoints here"}
						ctaValue={""}
					/>
				</div>
			}
		</div>
	)
};

export const ReportPieChart = () => {
	const data = [
		// {
		// 	type: 'Male',
		// 	value: 27,
		// },
		// {
		// 	type: 'Female',
		// 	value: 25,
		// },
		{
			type: 'Male',
			value: 0,
		},
		{
			type: 'Female',
			value: 0,
		},
	];
	const config = {
		appendPadding: 10,
		data,
		angleField: 'value',
		colorField: 'type',
		radius: 0.9,
		color: ['#37B7AB', '#005E7A'],
		height: 300,
		label: {
			type: 'inner',
			offset: '-30%',
			content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
			style: {
				fontSize: 14,
				textAlign: 'center',
			},
		},
		interactions: [
			{
				type: 'element-active',
			},
		],
	};
	return <Pie {...config} />;
};


export function ReferralChart(props) {
	// const [data, setData] = useState([]);

	// useEffect(() => {
	// }, []);

	const config = {
		data: (props?.chartData || []),
		xField: 'date',
		yField: 'value',
		seriesField: 'type',
		yAxis: {
			label: {
				formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
			},
		},
		color: ['#027A48', '#D92D20'],
		smooth: true,
	};

	return <Line {...config} />;
};