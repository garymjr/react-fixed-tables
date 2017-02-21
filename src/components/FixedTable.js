import React from "react";
import { FixedTableBody } from "./FixedTableBody";
import { FixedTableFooter } from "./FixedTableFooter";
import { FixedTableHeader } from "./FixedTableHeader";

export class FixedTable extends React.Component {
    render() {
        return (
            <div className="fixedTableContainer" style={{
                height: this.props.height,
                width: this.props.width
            }}>
                <FixedTableHeader height={this.props.rowHeight}>
                    {this.props.children}
                </FixedTableHeader>
                <FixedTableBody
                    cols={this.props.children}
                    data={this.props.data}
                    height={this.props.height - (this.props.rowHeight * 2) - 3}
                    rowCount={this.props.rowCount}
                    rowHeight={this.props.rowHeight} />
                <FixedTableFooter cols={this.props.children} data={this.props.data} height={this.props.rowHeight} />
            </div>
        );
    }
}