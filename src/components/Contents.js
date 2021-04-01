import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Doughnut, Line } from "react-chartjs-2";

export default function Contents() {
  const [data, setData] = useState([{
    labels: ["1월", "2월", "3월"],
    datasets: [
      {
        label: "국내 누적 확진자",
        backgroundColor: "#E82B26",
        fill: true,
        data: [10, 5, 3, 0],
      }
    ],
  }]);

  useEffect(() => {
  //   async function fetch_data() {
  //     const res = await axios.get('https://api.covid19api.com/total/dayone/country/kr')
  //     console.log(res.data);
  //   }
  //   fetch_data();

    function makeData(items) {
      const _data = [];
      let prev_month = -1; // 지난 달 초기값

      items.forEach(item => {
        const year = Number(item.Date.split('-')[0]);
        const cur_month = Number(item.Date.split('-')[1]);
        const date = Number(item.Date.split('-')[2].slice(0,2));
        const last_date = Number(new Date(year, cur_month, 0).getDate());
       
        // 월별 말일만 검색(같은 월이 아닐때)
        if(prev_month !== cur_month) {
          // 말일이 아니면 제외
          if(date == last_date){
            console.log('last date= ', last_date)
            _data.push({
              year: year,
              month: cur_month,
              date: date,
              confirmed: item.Confirmed,
            });
          }         
        }
      });
      console.log(_data)
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
      <figure className="chart">
        <Bar 
          data={data[0]}
          options={
            {
              title: {display: true, text:"누적 확진자 추이", fontSize: 16}, 
              legend: {display: true, position: 'bottom'}
            }
          }
        />
      </figure>
    </section>
  );
}
