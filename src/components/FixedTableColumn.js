import React from 'react'

export class FixedTableColumn extends React.Component {
  render () {
    return (
      <th className='fixedTableColumn' style={{
        backgroundColor: '#f6f7f8',
        backgroundImage: 'linear-gradient(#fff,#efefef)',
        borderRight: '1px solid #d3d3d3',
        fontSize: '14px',
        height: this.props.height,
        textAlign: this.props.align,
        verticalAlign: 'middle',
        width: this.props.width
      }}>
        {this.props.children}
      </th>
    )
  }
}
