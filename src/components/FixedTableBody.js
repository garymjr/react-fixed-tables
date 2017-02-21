import React from "react";
import $ from "jquery";

export class FixedTableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseOver: false,
            rowCount: 0
        }

        window.addEventListener('mousewheel', this.handleScroll.bind(this));
    }

    componentDidMount() {
        let self = this;

        const fixedTableBody = document.querySelector('.fixedTableBody');
        fixedTableBody.addEventListener('mouseenter', () => {
            self.setState({ mouseOver: true });
        });
        fixedTableBody.addEventListener('mouseleave', () => {
            self.setState({ mouseOver: false });
        });
    }

    componentWillUnmount() {
        const fixedTableBody = document.querySelector('.fixedTableBody');
        window.removeEventListener('mousewheel', this.handleScroll);
    }

    handleScroll(event) {
        if (this.state.mouseOver) {
            event.preventDefault();
            const body = $(".fixedTableBody");
            let transformY = body.css('transform').split(',')[5];
            let maxY = -((this.props.rowCount * this.props.rowHeight) - (this.props.height));
            transformY = transformY.slice(0, -1);

            let deltaY = parseInt(transformY - event.deltaY);
            if (deltaY >= 0) {
                deltaY = 0;
            } else if (deltaY <= maxY) {
                deltaY = maxY;
            }

            body.css("transform", `translate3d(0px, ${deltaY}px, 0px)`);
        }
    }

    collectRows() {
        let rows = [];
        let rowBg;

        for (let i = 0; i < this.props.data.getSize(); i++) {
            let row = [];
            let j = 0;
            this.props.cols.forEach(c => {
                const Cell = c.props.cell;
                row.push(<Cell align={c.props.align} data={this.props.data.getObjectAt(i)[c.props.col]} key={j} width={c.props.width} />);
                j++;
            });

            if (i % 2 !== 0) {
                rowBg = '#f6f7f8';
            } else {
                rowBg = '#fff';
            }

            rows.push(<tr className="fixedTableRow" key={i} style={{ backgroundColor: rowBg, height: this.props.rowHeight }}>{row}</tr>);
        }
        return rows;
    }

    render() {
        return (
            <div className="fixedTableBodyContainer" style={{
                height: this.props.height,
                overflowY: 'hidden'
            }}>
                <table className="fixedTableBody" style={{
                    border: '1px solid #d3d3d3',
                    borderCollapse: 'collapse',
                    tableLayout: 'fixed',
                    transform: 'translate3d(0px, 0px, 0px)',
                    width: "100%"
                }}>
                    <tbody style={{ whiteSpace: 'nowrap' }}>
                        {this.collectRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}