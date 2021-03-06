import React, {PropTypes} from 'react'

export class FixedTableHeader extends React.Component {
  render () {
    return (
      <div className='fixedTableHeaderContainer'>
        <table className='fixedTableHeader' style={{
          border: '1px solid #d3d3d3',
          borderCollapse: 'collapse',
          height: this.props.height,
          tableLayout: 'fixed',
          width: '100%'
        }}>
          <thead style={{ borderBottom: '1px solid #d3d3d3' }}>
            <tr>
              {this.props.children}
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}

FixedTableHeader.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired
}
