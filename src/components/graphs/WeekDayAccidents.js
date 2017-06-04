import React, { Component } from 'react';
import weekdays from '../../data/weekday.json';
import {BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

export default class WeekDayAccidents extends Component {

    render() {
      let data = []
      for(let index in weekdays){
        let dia = "";
        if (index == "0") {
          dia = "Segunda"
        }else if (index == "1") {
          dia = "Terça"
        }else if (index == "2") {
          dia = "Quarta"
        }else if (index == "3") {
          dia = "Quinta"
        }else if (index == "4") {
          dia = "Sexta"
        }else if (index == "5") {
          dia = "Sabado"
        }else if (index == "6") {
          dia = "Domingo"
        }
        data.push({
          "accidents": weekdays[index],
          "rank" : dia,
        })
      }

      return(

        <Card>
        <CardTitle title="Total de acidentes por dias de semana"/>
        <CardText style={{ 'text-align': 'center' }}>
        <BarChart width={900}
            height={260}
            data={data}>
          <XAxis
           dataKey="rank"
           fontFamily="sans-serif"
           />
          <YAxis hide/>
          <Bar
           dataKey="accidents"
           barSize ={170}
           fontFamily="sans-serif"
           >
           {
                data.map((entry, index) => (
                    <Cell fill={data[index].AnswerRef === "three" ? '#ededed' : '#61bf93'} />
                ))
            }

        </Bar>
        </BarChart>
        </CardText>
        </Card>
      );
    }

}
