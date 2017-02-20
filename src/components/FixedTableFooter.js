import React from "react";

export class FixedTableFooter extends React.Component {
    renderTotals() {
        let totals = [];
        let data = this.props.data;

        let i = 0;
        this.props.cols.forEach(col => {
            let footerStyle = {
                backgroundColor: '#f6f7f8',
                backgroundImage: 'linear-gradient(#fff,#efefef)',
                borderRight: '1px solid #d3d3d3',
                fontSize: '12px',
                fontWeight: "bold",
                height: this.props.height,
                textAlign: col.props.align,
                verticalAlign: 'middle',
                width: col.props.width
            }

            if (col.props.showTotals) {
                let total = 0;
                for (let j = 0; j < data.getSize(); j++) {
                    total += parseFloat(data.getObjectAt(j)[col.props.col]);
                }
                totals.push(<td key={i} style={footerStyle}>{parseFloat(total.toString()).toFixed(2)}</td>);
            } else {
                totals.push(<td key={i} style={footerStyle}>{''}</td>);
            }
            i++;
        });
        return totals;
    }

    render() {
        return (
            <div className="fixedTableFooterContainer">
                <table className="FixedTableFooter" style={{
                    borderCollapse: 'collapse',
                    height: this.props.height,
                    tableLayout: 'fixed',
                    width: "100%"
                }}>
                    <tfoot style={{ borderTop: '1px solid #d3d3d3' }}>
                        <tr>
                            {this.renderTotals()}
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}