import React from "react";
import { Bar } from "react-chartjs-2";
import {Grid, Text} from "../elements";
import styled from "styled-components";

const Chart = (props) => {
const {day, questRate, studyTime, studySetTime}=props;

//그래프로 표현할 날짜 계산(오늘로부터 5일 전까지)
const getDateStr=(date)=>{
    const month = (date.getMonth()+1);
    const day = date.getDate();
return month+"월 "+day+"일"
}

const getGraphRange=()=>{
    const range=[];
    for(let i=1;i<6;i++){
        let today = new Date();
        let dayOfMonth = today.getDate();
        today.setDate(dayOfMonth-i);
        range.push(getDateStr(today));
    }
    console.log(range);
}

React.useEffect(()=>{
getGraphRange();
}, []);

  const data = {
    labels: [`목표:${studySetTime}시간`, `목표:${studySetTime}시간` ,`목표:${studySetTime}시간`, `목표:${studySetTime}시간`, `목표:${studySetTime}시간`],
    datasets: [
      {
        label: false,
        backgroundColor: [
          "rgb(28,155,251)",
          "rgb(38,231,166)",
          "rgb(254,188,59)",
          "rgb(255,97,120)",
          "rgb(139,117,215)",
        ],
        borderColor: false,
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(28,155,251,0.4)",
          "rgba(38,231,166,0.4)",
          "rgba(254,188,59,0.4)",
          "rgba(255,97,120,0.4)",
          "rgba(139,117,215,0.4)",
        ],
        hoverBorderColor: [
          "rgb(28,155,251)",
          "rgb(38,231,166)",
          "rgb(254,188,59)",
          "rgb(255,97,120)",
          "rgb(139,117,215)",
        ],
        data: [3, 5, 2, 6, 1],
      },
    ],
  };

  var delayed;
  return (
    <React.Fragment>
    <ChartBox>
      <Bar
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true,
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (
                context.type === "data" &&
                context.mode === "default" &&
                !delayed
              ) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
          scales: {
            xAxes: [
              {
                grid: {
                  borderWidth: 3,
                },
                gridLines: {
                    display: false,
                  drawOnChartArea: false,
                  lineWidth: 3,
                  color: "rgb(88,83,84)",
                },
                ticks: {
                    display: false,
                    fontColor: 'black',
                    padding:0,
                    fontSize: 17,
                  },
                  barPercentage: 0.6,
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  drawOnChartArea: false,
                },
                ticks: {
                  display: false,
                  beginAtZero: true,
                  max: 7,
                },
              },
            ],
          },
          legend: { display: false },
          tooltips:{
              displayColors:false,
              titleAlign:'center',
              bodyAlign:'center',
              callbacks:{
                  label: function(tooltipItem, data){
return data['datasets'][0]['data'][tooltipItem['index']]+"시간 달성!";
                  },
              }
          },
        }}
      />
      <Xaxis/>
      <Grid is_flex padding="0 1px 0 10px">
          {/* day기준 map으로 data 채워넣기 */}
          <Lable><Text size="10px" bold>{day+" "+studyTime}시간<br/>
          <Point>{questRate}</Point>완료!
          </Text>
          </Lable>
          <Lable><Text size="10px" bold>{day+" "+studyTime}시간<br/>
          <Point>{questRate}</Point>완료!
          </Text>
          </Lable>
          <Lable><Text size="10px" bold>{day+" "+studyTime}시간<br/>
          <Point>{questRate}</Point>완료!
          </Text>
          </Lable>
          <Lable><Text size="10px" bold>{day+" "+studyTime}시간<br/>
          <Point>{questRate}</Point>완료!
          </Text>
          </Lable>
          <Lable><Text size="10px" bold>{day+" "+studyTime}시간<br/>
          <Point>{questRate}</Point>완료!
          </Text>
          </Lable>
      </Grid>
    </ChartBox>
      
      </React.Fragment>
  );
};

const ChartBox = styled.div`
width: 445px;
height: 255px;
box-sizing:border-box;
position:relative;
`;
const Xaxis = styled.hr`
width:100%;
margin:0;
border: none;
height:1.2px;
position:absolute;
bottom:42px;
background-color: black;
`;

const Lable=styled.div`
height:30px;
width:85px;
margin:0;
text-align:center;
padding:0 3px;
box-sizing:border-box;
`;
const Point = styled.span`
    color:#e3344e;
`
Chart.defaultProps = {
  day:"4월 5일",
  questRate: "70%",
  studyTime: 3,
  studySetTime: 6,
  quest: [1, "차트만들기", "Y"],
};

export default Chart;
