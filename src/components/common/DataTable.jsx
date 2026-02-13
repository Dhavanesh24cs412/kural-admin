// src/components/common/DataTable.jsx
export default function DataTable({ columns, rows }) {
  return (
    <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left font-medium text-slate-600"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-slate-100 last:border-0"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-2 text-slate-700"
                >
                  {col.render
                    ? col.render(row)
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
