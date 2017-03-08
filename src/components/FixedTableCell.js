import React, {PropTypes} from 'react'

export class FixedTableCell extends React.Component {
  render () {
    return (
      <td
        className='fixedTableCell'
        style={{
          textAlign: this.props.align,
          borderRight: '1px solid #d3d3d3',
          borderBottom: '1px solid #d3d3d3',
          fontSize: '12px',
          width: this.props.width,
          ...this.props.style
        }}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseOut={this.props.onMouseOut}
        onMouseOver={this.props.onMouseOver}>{this.props.data}</td>
    )
  }
}

FixedTableCell.propTypes = {
  align: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  style: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired
}
