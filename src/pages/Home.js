// @flow
import React, { Component } from 'react';
import { Card } from 'rebass';

import HW2 from './HW2/hw2.mdx';

export default class Home extends Component<{}> {
  render() {
    return (
      <Card>
        <HW2 />
      </Card>
    );
  }
}
