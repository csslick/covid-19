import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Doughnut, Line } from "react-chartjs-2";

export default function Contents() {

  // 확진자
  const [data, setData] = useState({
    labels: ["1월", "2월", "3월"],
    datasets: [
      {
        label: "국내 누적 확진자",
        backgroundColor: "#E82B26",
        fill: true,
        data: [10, 5, 3, 0],
      }
    ],
  });

  // 격리자(Active)
  const [activeData, setActiveData] = useState({
    labels: ["1월", "2월", "3월"],
    datasets: [
      {
        label: "국내 누적 확진자",
        backgroundColor: "#E82B26",
        fill: true,
        data: [10, 5, 3, 0],
      }
    ],
  });

  useEffect(() => {
    function makeData(items) {
      const _data = [];

      // 날짜 데이터 가공
      items.forEach(item => {
        const year = Number(item.Date.split('-')[0]);
        const month = Number(item.Date.split('-')[1]);
        const date = Number(item.Date.split('-')[2].slice(0,2));
        const last_date = Number(new Date(year, month, 0).getDate());
        // 격리자(active)
        const active = item.Active
       
        // 월별 말일 데이터만 추출(누적 확진자 데이터만 필요)
        if(date === last_date){
          console.log('last date= ', last_date)
          _data.push({
            year: year,
            month: month + '월',
            date: date,
            confirmed: item.Confirmed,
            active: item.Active,
          });
        }         

      });

      const labels = _data.map(d => d.year + ' ' + d.month) // 월
      setData({
        labels: labels,
        datasets: [
          {
            label: "국내 누적 확진자",
            backgroundColor: "#E82B26",
            fill: true,
            data: _data.map(d => d.confirmed), //  누적확진자
          }
        ],
      });

      setActiveData({
        labels: labels,
        datasets: [
          {
            label: "월별 격리자",
            // backgroundColor: "#3C8755",
            borderColor: "#3C8755",
            fill: false,
            data: _data.map(d => d.active), //  누적확진자
          }
        ],
      });
      console.log(data)
    }

    axios
      .get("https://api.covid19api.com/total/dayone/country/kr")
      .then(function (response) {
        // handle success
        makeData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })  

  }, []);

  return (
    <section>
      <h2>국내 코로나 현황</h2>
      <article className="chart">
        <figure>
          <Bar 
            data={data}
            options={
              {
                title: {display: true, text:"누적 확진자 추이", fontSize: 16}, 
                legend: {display: true, position: 'bottom'}
              }
            }
          />
        </figure>
        <figure>
          <Line
            data={activeData}
            options={
              {
                title: {display: true, text:"월별 격리자 현황", fontSize: 16}, 
                legend: {display: true, position: 'bottom'}
              }
            }
          />
        </figure>      
      </article>
    </section>
  );
}
