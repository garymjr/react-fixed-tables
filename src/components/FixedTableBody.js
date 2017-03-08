import React, {PropTypes} from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

export class FixedTableBody extends React.Component {
  collectRows () {
    let rows = []
    let rowBg

    for (let i = 0; i < this.props.rowCount; i++) {
      let Cell = null
      let row = []
      let j = 0

      this.props.cols.forEach(c => {
        let cellProps = {
          align: c.props.align,
          col: c.props.col,
          key: j,
          rowIndex: i,
          width: c.props.width,
          ...c.props.cell.props
        }

        if (React.isValidElement(c.props.cell)) {
          Cell = React.cloneElement(c.props.cell, cellProps)
        } else {
          cellProps.data = this.props.data
          Cell = c.props.cell(cellProps)
        }
        row.push(Cell)
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
      if (this.props.rowCount === 0) {
        return <tr><td colSpan={this.props.cols.length}>Loading Data...</td></tr>
      }
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
            <tbody>
              {loading()}
              {this.collectRows()}
            </tbody>
          </table>
        </div>
      </Scrollbars>
    )
  }
}

FixedTableBody.propTypes = {
  cols: PropTypes.array.isRequired,
  data: PropTypes.object,
  height: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired
}
