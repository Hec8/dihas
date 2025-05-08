import React from 'react'

const statusColors = {
  Completed: 'bg-green-100 text-green-600',
  Processing: 'bg-purple-100 text-purple-600',
  Rejected: 'bg-red-100 text-red-600',
}

const data = [
  { email: 'collaborateur@gmail.com', project: "Diha's", date: '14 Feb 2019', priority: 'Completed', status: 'Completed' },
  { email: 'collaborateur@gmail.com', project: "Diha's", date: '14 Feb 2019', priority: 'Processing', status: 'Processing' },
  { email: 'collaborateur@gmail.com', project: "Diha's", date: '14 Feb 2019', priority: 'Rejected', status: 'Rejected' },
  { email: 'collaborateur@gmail.com', project: "Diha's", date: '14 Feb 2019', priority: 'Completed', status: 'Completed' },
  { email: 'collaborateur@gmail.com', project: "Diha's", date: '14 Feb 2019', priority: 'Processing', status: 'Processing' },
  { email: 'collaborateur@gmail.com', project: "Diha's", date: '14 Feb 2019', priority: 'Completed', status: 'Completed' },
]

export default function TableStats() {
  return (
    <div className="p-6 bg-green-50 rounded-xl overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-2">Photo</th>
            <th className="px-4 py-2">Projets</th>
            <th className="px-4 py-2">Collaborateurs</th>
            <th className="px-4 py-2">Échéancier</th>
            <th className="px-4 py-2">Priorité</th>
            <th className="px-4 py-2">Statut</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className="bg-white border-b" key={index}>
              <td className="px-4 py-2">
                <div className="w-6 h-6 bg-orange-400 rounded-full" />
              </td>
              <td className="px-4 py-2">{item.project}</td>
              <td className="px-4 py-2">
                {item.email} <span className="ml-1">▼</span>
              </td>
              <td className="px-4 py-2">{item.date}</td>
              <td className="px-4 py-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.priority]}`}>
                  {item.priority}
                </span>
              </td>
              <td className="px-4 py-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.status]}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
