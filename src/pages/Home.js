// @flow
import React, { Component } from 'react';
import { Card } from 'rebass';

import HW1 from './HW1/hw1.mdx';

export default class Home extends Component<{}> {
  render() {
    return (
      <Card>
        <HW1 />
      </Card>
    );
  }
}
