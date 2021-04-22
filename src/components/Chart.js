import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Text } from "../elements";
import styled from "styled-components";

const Chart = (props) => {
  const dayInfo = useSelector((state) => state.quest.monthQuest);
  let range = [];
  console.log(dayInfo);
  //그래프 표기 범위 설정
  if (dayInfo.length > 5) {
    dayInfo.filter((q, idx) => {
      if (idx < 5) {
        range.push(q);
      }
    });
  } else {
    range = dayInfo;
  }
  console.log(range);
  // console.log(range);
  const rangeLabel = range.map((day) => {
    if (day.studySetTime && day.questRate > 30) {
      return (
        day.studySetTime + "시간동안 " + Math.round(day.questRate) + "%달성!"
      );
    } else if (day.studySetTime && day.questRate >= 0) {
      return "달성률" + day.questRate + "% 생산성을 높여야해요!";
    } else {
      return "달성률이 아쉬워요. 다음에 더 잘할 수 있어요!";
    }
  });
  const rangeData = range.map((day) => {
    return day.studySetTime;
  });

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
        maxBarThickness: 40,
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
                  barPercentage: 0.8,
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
        <LabelBox>
          {range.map((day, idx) => {
            const date = day.day.split("/");
            return (
              <Label key={idx}>
                <Text size="10px" bold>
                  {date[1] + "월" + date[2] + "일 " + day.studySetTime}시간
                  <br />
                  {day.questRate ? (
                    <Point>목표달성률 {parseInt(day.questRate)}%</Point>
                  ) : (
                    <Point>0%</Point>
                  )}
                </Text>
              </Label>
            );
          })}
        </LabelBox>
      </ChartBox>
    </React.Fragment>
  );
};

const ChartBox = styled.div`
  width: 100%;
  min-width: 352px;
  height: 87%;
  box-sizing: border-box;
  position: relative;
  @media all and (max-width: 767px) {
    min-width: 280px;
  }
`;
const Xaxis = styled.hr`
  width: 100%;
  margin: 0;
  border: none;
  height: 1.2px;
  position: absolute;
  bottom: 10px;
  background-color: black;
`;
const LabelBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 1px 0 10px;
`;

const Label = styled.div`
  height: 1px;
  width: 20%;
  min-width: 69.7px;
  text-align: center;
  padding: 0 3px;
  box-sizing: border-box;
  @media all and (max-width: 1105px) {
    height: 1px;
    overflow: hidden;
  }
  @media all and (max-width: 767px) {
    display: none;
  }
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
