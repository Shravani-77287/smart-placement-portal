import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function Analytics({ companies }) {
  // If there are no companies, don't show the analytics
  if (!companies || companies.length === 0) return null;

  // 1. Calculate our top-level numbers
  const total = companies.length;
  const interviewing = companies.filter(c => c.status === 'Interviewing').length;
  const offered = companies.filter(c => c.status === 'Offered').length;

  // 2. Group the data for the Pie Chart
  const statusCounts = companies.reduce((acc, company) => {
    acc[company.status] = (acc[company.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(statusCounts).map(key => ({
    name: key,
    value: statusCounts[key]
  }));

  // Colors for the chart slices
  const COLORS = {
    'Applied': '#0088FE',
    'Interviewing': '#FFBB28',
    'Offered': '#00C49F',
    'Rejected': '#FF8042'
  };

  return (
    <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
      <h3 style={{ color: '#fff', marginTop: 0, borderBottom: '1px solid #444', paddingBottom: '10px' }}>
        Application Analytics
      </h3>
      
      {/* Number Cards */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <div style={{ flex: 1, backgroundColor: '#333', padding: '15px', borderRadius: '5px', textAlign: 'center' }}>
          <p style={{ color: '#aaa', margin: '0 0 5px 0', fontSize: '14px' }}>Total Applications</p>
          <h2 style={{ color: '#fff', margin: 0 }}>{total}</h2>
        </div>
        <div style={{ flex: 1, backgroundColor: '#333', padding: '15px', borderRadius: '5px', textAlign: 'center' }}>
          <p style={{ color: '#aaa', margin: '0 0 5px 0', fontSize: '14px' }}>Active Interviews</p>
          <h2 style={{ color: '#FFBB28', margin: 0 }}>{interviewing}</h2>
        </div>
        <div style={{ flex: 1, backgroundColor: '#333', padding: '15px', borderRadius: '5px', textAlign: 'center' }}>
          <p style={{ color: '#aaa', margin: '0 0 5px 0', fontSize: '14px' }}>Offers Received</p>
          <h2 style={{ color: '#00C49F', margin: 0 }}>{offered}</h2>
        </div>
      </div>

      {/* The Pie Chart */}
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#8884d8'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;