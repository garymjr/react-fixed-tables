import React, {PropTypes} from 'react'

export class FixedTableFooter extends React.Component {
  renderTotals () {
    let totals = []

    let i = 0
    this.props.cols.forEach(col => {
      let Cell = null
      let footerStyle = {
        backgroundColor: '#f6f7f8',
        backgroundImage: 'linear-gradient(#fff,#efefef)',
        borderRight: '1px solid #d3d3d3',
        fontSize: '12px',
        fontWeight: 'bold',
        height: this.props.height,
        textAlign: col.props.align,
        verticalAlign: 'middle',
        width: col.props.width
      }

      if (col.props.footer) {
        let footerProps = {
          align: col.props.align,
          col: col.props.col,
          key: i,
          style: footerStyle,
          width: col.props.width,
          ...col.props.footer.props
        }

        if (React.isValidElement(col.props.footer)) {
          Cell = React.cloneElement(col.props.footer, footerProps)
        } else {
          footerProps.data = this.props.data
          Cell = col.props.footer(footerProps)
        }

        totals.push(Cell)
      } else {
        totals.push(<td key={i} style={footerStyle}>{''}</td>)
      }
      i++
    })
    return totals
  }

  render () {
    return (
      <div className='fixedTableFooterContainer'>
        <table className='FixedTableFooter' style={{
          border: '1px solid #d3d3d3',
          borderCollapse: 'collapse',
          height: this.props.height,
          tableLayout: 'fixed',
          width: '100%'
        }}>
          <tfoot style={{ borderTop: '1px solid #d3d3d3' }}>
            <tr>
              {this.renderTotals()}
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

FixedTableFooter.propTypes = {
  cols: PropTypes.array,
  data: PropTypes.object,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired
}
