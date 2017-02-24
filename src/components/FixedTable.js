import React from 'react'
import { FixedTableBody } from './FixedTableBody'
import { FixedTableFooter } from './FixedTableFooter'
import { FixedTableHeader } from './FixedTableHeader'

export class FixedTable extends React.Component {
  renderHeaders () {
    let headers = []
    React.Children.forEach(this.props.children, child => {
      let Header = child.type
      headers.push(<Header height={this.props.rowHeight} {...child.props} />)
    })
    return headers
  }

  render () {
    return (
      <div className='fixedTableContainer' style={{
        height: this.props.height,
        width: this.props.width
      }}>
        <FixedTableHeader height={this.props.rowHeight}>
          {this.renderHeaders()}
        </FixedTableHeader>
        <FixedTableBody
          cols={this.props.children}
          data={this.props.data}
          height={this.props.height - (this.props.rowHeight * 2) - 3}
          rowCount={this.props.rowCount}
          rowHeight={this.props.rowHeight} />
        <FixedTableFooter cols={this.props.children} data={this.props.data} height={this.props.rowHeight} />
      </div>
    )
  }
}
