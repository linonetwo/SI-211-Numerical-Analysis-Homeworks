// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import preval from 'preval.macro';
import ReactEcharts from 'echarts-for-react';

import getLagrangePolynomialCoefficients from './lagrange';

const InterpolationContainer = styled(Flex)``;

const CodeBlock = styled.pre`
  background-color: #ccc;
  padding: 20px;
`;
export const LagrangeFunctionString = () => (
  <CodeBlock>
    <code>
      {preval`
        const fs = require('fs')
        const functionString = fs.readFileSync(__dirname + '/lagrange.js', 'utf8')
        module.exports = functionString
      `}
    </code>
  </CodeBlock>
);

const Table = styled.table`
  box-shadow: 0px 0px 10px 0 #ccc;
`;

const xPoints = Array.from(Array(11).keys()).map(index => index - 5);
// 太小的值 Echarts 显示不好，放大一点
const plotMultiplier = 10000;
export class Interpolation extends Component<{ func: (x: number) => number }, {}> {
  chartOption = {
    title: {
      text: 'Interpolation Error',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: ({ value }) => value / plotMultiplier,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    yAxis: [
      {
        name: 'error',
        axisLabel: {
          formatter(value) {
            return value / plotMultiplier;
          },
        },
      },
    ],
    xAxis: {
      type: 'category',
      name: 'x',
    },
  };

  render() {
    const { func } = this.props;
    const coefficients = getLagrangePolynomialCoefficients(xPoints.map(x => ({ x, y: func(x) })));
    const lagrangeFunction = (x: number) =>
      coefficients.map((an, index) => an * x ** index).reduce((prev, current) => prev + current, 0);

    const funcY = xPoints.map(x => func(x));
    const lagrangeY = xPoints.map(x => lagrangeFunction(x));
    const errorY = xPoints.map((x, index) => Math.abs(funcY[index] - lagrangeY[index]));
    const chart = (
      <ReactEcharts
        option={{
          ...this.chartOption,
          xAxis: {
            ...this.chartOption.xAxis,
            data: xPoints,
          },
          series: [
            {
              name: 'error',
              type: 'line',
              data: errorY.map(value => value * plotMultiplier),
            },
          ],
        }}
        style={{ height: '350px', width: '100%' }}
        className="react_for_echarts"
      />
    );

    return (
      <InterpolationContainer column>
        <h4>Coefficients</h4>
        <Table style={{ width: 400, marginBottom: 40 }}>
          <tr>
            <th>index</th>
            <th>an</th>
          </tr>
          {coefficients.map((an, index) => (
            <tr>
              <td>{index}</td>
              <td>{an}</td>
            </tr>
          ))}
        </Table>
        <Flex>
          <h4>Original</h4>
          <Table>
            <tr>
              <th>x</th>
              <th>y</th>
            </tr>
            {xPoints.map((x, index) => (
              <tr>
                <td>{x}</td>
                <td>{funcY[index]}</td>
              </tr>
            ))}
          </Table>

          <h4>Interpolation</h4>
          <Table>
            <tr>
              <th>x</th>
              <th>y</th>
            </tr>
            {xPoints.map((x, index) => (
              <tr>
                <td>{x}</td>
                <td>{lagrangeY[index]}</td>
              </tr>
            ))}
          </Table>

          <h4>Error</h4>
          <Table>
            <tr>
              <th>x</th>
              <th>y</th>
            </tr>
            {xPoints.map((x, index) => (
              <tr>
                <td>{x}</td>
                <td>{errorY[index]}</td>
              </tr>
            ))}
          </Table>
        </Flex>
        {chart}
      </InterpolationContainer>
    );
  }
}
