import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';

const DataTable = ({ data, uniqueSegments }) => {
    const [selectedSegment, setSelectedSegment] = useState('All');
    const [label, setLabel] = useState("These are all your customers!")
    // Columns for the table
    const columns = useMemo(
        () => [
            {
                Header: 'Order Type',
                accessor: 'Order Type',
            },
            {
                Header: 'Area',
                accessor: 'Area',
            },
            {
                Header: 'Item Name',
                accessor: 'Item Name',
            },
            {
                Header: 'Price',
                accessor: 'Price',
            },
            {
                Header: 'Phone',
                accessor: 'Phone',
            },
            {
                Header: 'Name',
                accessor: 'Name',
            },
            {
                Header: 'Segment',
                accessor: 'Segment',
            },
        ],
        []
    );

    // Filter data based on selected segment
    const filteredData = useMemo(() => {
        let result = data;

        if (selectedSegment !== 'All') {
            if(selectedSegment==3)
            setLabel("Segment 3")
            else if(selectedSegment==2)
            setLabel("Segment 2")
            else if(selectedSegment==1)
            setLabel("Segment 1")
            else 
            setLabel("Segment 0")
            result = result.filter((item) => item['Segment'] == selectedSegment);
            console.log(result)
        }

        return result;
    }, [data, selectedSegment]);

    // Table instance
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: filteredData });

    return (
        <div style={{ padding: "2rem" }}>
        {/* Segment dropdown */}
        <label htmlFor="segmentSelect" style={{ marginRight: '1rem', fontWeight: 'bold' }}>
            Select Segment:
        </label>
        <select
            id="segmentSelect"
            onChange={(e) => setSelectedSegment(e.target.value)}
            value={selectedSegment}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
            {uniqueSegments.map((segment) => (
                <option key={segment} value={segment}>
                    {segment}
                </option>
            ))}
        </select>

        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{label}</p>

        {/* Table */}
        <table {...getTableProps()} style={{ marginTop: '20px', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);
};

export default DataTable;
