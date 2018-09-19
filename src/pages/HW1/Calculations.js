// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import ReactEcharts from 'echarts-for-react';

const Container = styled(Flex)`
  background-color: #ccc;

  margin-top: 20px;
`;
export class DisplayNumericalErrors extends Component<*> {
  functionToUse = x => Math.sin(10 ** 4 * x) / x;

  render() {
    const { value = Math.PI } = this.props;
    return (
      <Container column>
        <pre>
          <code>{this.functionToUse.toString()}</code>
        </pre>
        <p>↓</p>
        <p>{this.functionToUse(value)}</p>
      </Container>
    );
  }
}

export class Difference extends Component<*> {
  chartOption = {
    title: {
      text: 'numerical differentiation error',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}',
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
        type: 'log',
      },
    ],
    xAxis: {
      type: 'category',
      name: 'h',
    },
  };

  functionToUse = (functionToDiff, x, h) => (functionToDiff(x + h) - functionToDiff(x - h)) / (2 * h);

  render() {
    const { functionToDiff, x, h, hRange, actualDifference } = this.props;
    let chart = null;
    if (hRange && typeof actualDifference === 'number') {
      const hArray = Array.from(Array(hRange[1] - hRange[0] + 1).keys()).map(index => 1 / 10 ** (index - hRange[1]));
      chart = (
        <ReactEcharts
          option={{
            ...this.chartOption,
            xAxis: {
              ...this.chartOption.xAxis,
              data: hArray,
            },
            series: [
              {
                name: 'error',
                type: 'line',
                data: hArray.map(someH => Math.abs(this.functionToUse(functionToDiff, x, someH) - actualDifference)),
              },
            ],
          }}
          style={{ height: '350px', width: '100%' }}
          className="react_for_echarts"
        />
      );
    }
    return (
      <Container column>
        <pre>
          <code>{this.functionToUse.toString()}</code>
        </pre>
        {functionToDiff &&
          typeof x === 'number' &&
          typeof h === 'number' && (
            <>
              <p>
                Apply {functionToDiff.toString()} with x=
                {x} h=
                {h}
              </p>
              <p>↓</p>
              <p>{this.functionToUse(functionToDiff, x, h)}</p>
            </>
          )}
        {chart}
      </Container>
    );
  }
}
