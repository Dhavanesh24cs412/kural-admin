// src/components/common/DataTable.jsx
export default function DataTable({ columns, rows }) {
  return (
    <div className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider font-sans"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-slate-50 transition-colors duration-150 group"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 text-slate-700 font-medium group-hover:text-primary transition-colors"
                >
                  {col.render
                    ? col.render(row)
                    : <span className="font-body">{row[col.key]}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
