import React, { useState, useEffect } from 'react';
import { Line, Column, Bar, Pie } from '@ant-design/plots';
import { EmptyStateComp } from '.';

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

export const DashboardChart = (props) => {
	const [arr, setArr] = useState([])
	const [combinedArr, setCombinedArr] = useState([])
	
	useEffect(() => {
		triggerChartData()
	}, [arr, props.chartData, props.tag, props.graphInterval])
	let triggerChartData= ()=>{
		if(props.graphInterval == "weekly"){
			setCombinedArr([])
			Object.entries(props.chartData.week_record).map((data) => {
				let currArr = Object.entries(data[1]).map(([key, value]) => ({
					'value':value, 
					'type': key.charAt(0).toUpperCase() + key.slice(1), 
					'date':data[0],
				}))
				setCombinedArr((prevCombinedArr) => prevCombinedArr.concat(currArr));
			})
		}else if(props?.graphInterval == "monthly"){
			setCombinedArr([])
			Object.entries(props.chartData.month_record).map((data) => {
				let currArr = Object.entries(data[1]).map(([key, value]) => ({
					'value':value, 
					'type': key.charAt(0).toUpperCase() + key.slice(1), 
					'date':data[0],
				}))
				setCombinedArr((prevCombinedArr) => prevCombinedArr.concat(currArr));
			})
		}
	}	
	if(props.chartType == "pieChart"){
		const config = {
			appendPadding: 10,
			data: combinedArr.length >0 ? combinedArr : [],
			angleField: 'value',
			colorField: 'type',
			radius: 0.9,
			color: ['#542D77', '#9154C7', '#9154C799', '#9154C766', '#9154C733', '#9370db', '#9400d3', '#4b0082', '#483d8b', ],
			height: 500,
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
	}else{
		const config = {
			data: combinedArr.length >0 ? combinedArr : [], // Use combinedArr here instead of combinedArray
			xField: 'date',
			yField: 'value',
			seriesField: 'type',
			isGroup: true,
			columnStyle: {
			  radius: [20, 20, 0, 0],
			},
			color: ['#542D77', '#9154C7', '#9154C799', '#9154C766', '#9154C733', '#9370db', '#9400d3', '#4b0082', '#483d8b', ],
			minColumnWidth: 3,
			maxColumnWidth: 7,
			dodgePadding: 5,
			height:400
		  };
		  return props.chartType == "graphChart" ? <Line {...config} /> :  <Column {...config} />;
	}
};
