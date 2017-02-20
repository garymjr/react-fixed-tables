import React from "react";

export class FixedTableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deltaY: 0,
            maxY: -((35 * this.props.rowCount) - this.props.height),
            mouseOver: false,
            rows: []
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
            let deltaY = (this.state.deltaY + event.deltaY);
            if (deltaY >= 0) {
                deltaY = 0;
            } else if (deltaY <= this.state.maxY) {
                deltaY = this.state.maxY;
            }

            this.setState({ deltaY: deltaY });
        }
    }

    collectRows() {
        let rows = [];
        let rowBg;

        for (let i = 0; i < this.props.data.getSize(); i++) {
            let row = [];
            this.props.cols.forEach(c => {
                const Cell = c.props.cell;
                row.push(<Cell align={c.props.align} data={this.props.data.getObjectAt(i)[c.props.col]} width={c.props.width} />);
            });

            if (i % 2 !== 0) {
                rowBg = '#f6f7f8';
            } else {
                rowBg = '#fff';
            }

            rows.push(<tr className="fixedTableRow" style={{ backgroundColor: rowBg, height: this.props.rowHeight }}>{row}</tr>);
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
                    borderCollapse: 'collapse',
                    tableLayout: 'fixed',
                    transform: `translate3d(0px, ${this.state.deltaY}px, 0px)`,
                    width: "100%"
                }}>
                    <tbody>
                        {this.collectRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}