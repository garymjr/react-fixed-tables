import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

export class FixedTableBody extends React.Component {
  collectRows () {
    let rows = []
    let rowBg

    for (let i = 0; i < this.props.data.getSize(); i++) {
      let row = []
      let j = 0
      this.props.cols.forEach(c => {
        const Cell = c.props.cell
        row.push(<Cell align={c.props.align} col={c.props.col} data={this.props.data} key={j} rowIndex={i} width={c.props.width} />)
        j++
      })

      if (i % 2 !== 0) {
        rowBg = '#f6f7f8'
      } else {
        rowBg = '#fff'
      }

      rows.push(<tr className='fixedTableRow' key={i} style={{ backgroundColor: rowBg, height: this.props.rowHeight }}>{row}</tr>)
    }
    return rows
  }

  render () {
    const loading = () => {
      if (this.props.rowCount === 0 && this.props.data.getSize() === 0) {
        return (<tr><td colSpan={this.props.cols.length}>Loading Data...</td></tr>)
      } else if (this.props.data.getSize() === 0) {
        return (<tr><td colSpan={this.props.cols.length}>No results</td></tr>)
      }
      return
    }

    return (
      <Scrollbars style={{ width: '100%', height: this.props.height }}>
        <div className='fixedTableBodyContainer'>
          <table className='fixedTableBody' style={{
            border: '1px solid #d3d3d3',
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
            width: '100%'
          }}>
            <tbody style={{ whiteSpace: 'nowrap' }}>
              {loading()}
              {this.collectRows()}
            </tbody>
          </table>
        </div>
      </Scrollbars>
    )
  }
}
