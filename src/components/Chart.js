import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Grid, Text } from "../elements";
import styled from "styled-components";
import moment from "moment";

const Chart = (props) => {
  const { day, questRate, studyTime, studySetTime } = props;
  const questList = useSelector((state) => state.quest.monthQuest);
  //그래프로 표현할 날짜 범위 저장
  const range = [];
  for (let i = 1; i < 6; i++) {
    const _day = moment().subtract(i, "d").format("YYYY/MM/DD");
    const day = questList.find((q) => q.day === _day);
    if (day) range.push(day);
  }

  const rangeLabel = questList.map((day) => {
    if (day.studySetTime && day.questRate > 30) {
      return day.studySetTime + "시간동안 " + day.questRate + "%달성!";
    } else if (day.studySetTime && day.questRate > 0) {
      return "달성률" + day.questRate + "% 생산성을 높여야해요!";
    } else {
      return "달성률이 아쉬워요. 다음에 더 잘할 수 있어요!";
    }
  });
  const rangeData = questList.map((day) => {
    return day.studySetTime;
  });

  const getDateStr = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return month + "월 " + day + "일";
  };

  const getGraphRange = () => {};

  React.useEffect(() => {}, []);

  const data = {
    labels: rangeLabel,
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
        data: rangeData,
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
                    fontColor: "black",
                    padding: 0,
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
            tooltips: {
              displayColors: false,
              titleAlign: "center",
              bodyAlign: "center",
              callbacks: {
                label: function () {
                  return null;
                },
              },
            },
          }}
        />
        <Xaxis />
        <Grid is_flex padding="0 1px 0 10px">
          {/* day기준 map으로 data 채워넣기 */}
          {questList.map((day, idx) => {
            const date = day.day.split("/");
            return (
              <Lable key={idx}>
                <Text size="10px" bold>
                  {date[1] + "월" + date[2] + "일 " + day.studySetTime}시간
                  <br />
                  {day.questRate ? (
                    <Point>목표달성률 {day.questRate}%</Point>
                  ) : (
                    <Point>0%</Point>
                  )}
                </Text>
              </Lable>
            );
          })}
        </Grid>
      </ChartBox>
    </React.Fragment>
  );
};

const ChartBox = styled.div`
  width: 445px;
  height: 255px;
  box-sizing: border-box;
  position: relative;
`;
const Xaxis = styled.hr`
  width: 100%;
  margin: 0;
  border: none;
  height: 1.2px;
  position: absolute;
  bottom: 42px;
  background-color: black;
`;

const Lable = styled.div`
  height: 30px;
  width: 85px;
  margin: 0;
  text-align: center;
  padding: 0 3px;
  box-sizing: border-box;
`;
const Point = styled.span`
  color: #e3344e;
`;
Chart.defaultProps = {
  day: "4월 5일",
  questRate: "70%",
  studyTime: 3,
  studySetTime: 6,
  quest: [1, "차트만들기", "Y"],
};

export default Chart;
