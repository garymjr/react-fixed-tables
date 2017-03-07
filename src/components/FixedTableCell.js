import React from 'react'

export class FixedTableCell extends React.Component {
  render () {
    const events = this.props.events ? this.props.events : {}
    return (
      <td className='fixedTableCell' style={{
        textAlign: this.props.align,
        borderRight: '1px solid #d3d3d3',
        borderBottom: '1px solid #d3d3d3',
        fontSize: '12px',
        width: this.props.width,
        ...this.props.style
      }} {...events}>{this.props.data}</td>
    )
  }
}
