import React from "react";
import "./grid.styl"

export interface GridColumnConfig<TItem> {
    title: string;
    value: (item: TItem) => React.ReactNode
}

export interface GridProps<TItem> {
    columns: GridColumnConfig<TItem>[]
    items: TItem[]
}

export function Grid<TItem>(props: GridProps<TItem>) {
    return <><table className="oplog-grid">
        <thead>
            <tr>
                {props.columns.map((x, i) => <th key={i} className={`${(i + 1) % 2 === 0 ? "even-cell" : ""}`}>{x.title}</th>)}
            </tr>

        </thead>
        <tbody>
            {props.items.map((item, i) => <tr key={i}>
                {props.columns.map((col, j) => <td key={j} className={`${(j + 1) % 2 === 0 ? "even-cell" : ""}`}>{col.value(item)}</td>)}
            </tr>)}
        </tbody>

    </table>
        {!props.items.length && <div className="oplog-grid__no-items-message">There are no records to display</div>}
    </>
}