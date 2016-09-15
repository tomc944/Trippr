import React from 'react';
import { render } from 'react-dom';
import Infinite from 'react-infinite';

const ReportsView = React.createClass({
  renderReports() {
    const reports = this.props.posts;
    const reportKeys = Object.keys(this.props.posts);

    return reportKeys.map((key) => {
      return <PostIndexItem key={key} report={reports[key]} />
    })
  }
  render() {
    <Infinite containerHeight={1000} elementHeight={200}>
      {this.renderReport()}
    </Infinite>
  }
})

export default ReportsView;
