import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import AddEntryForm from './AddEntryForm';
import HypotheticalForm from './HypotheticalForm';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function App() {
  const [financialData, setFinancialData] = useState({});
  const [showHypothetical, setShowHypothetical] = useState(false);

  useEffect(() => {
    fetch('/api/get-financial-data', {
      headers: { 'user_id': 'user1' }
    })
      .then(response => response.json())
      .then(data => setFinancialData(data));
  }, []);

  const handleAddEntry = (entry) => {
    fetch('/api/add-entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user_id': 'user1'
      },
      body: JSON.stringify(entry)
    }).then(() => console.log('Entry added'));
  };

  const handleAddHypothetical = (hypothetical) => {
    fetch('/api/add-hypothetical', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user_id': 'user1'
      },
      body: JSON.stringify(hypothetical)
    }).then(() => console.log('Hypothetical added'));
  };

  return React.createElement('div', null,
    React.createElement('h1', null, 'Financial Visualization Tool'),

    // Portfolio Breakdown
    React.createElement(Pie, {
      data: {
        labels: financialData.assets?.map(asset => asset.name),
        datasets: [{
          data: financialData.assets?.map(asset => asset.amount),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }]
      }
    }),

    // Revenue and Expense Charts
    React.createElement(Bar, {
      data: {
        labels: Array.from({ length: 5 }, (_, i) => 2024 + i),
        datasets: [
          {
            label: 'Revenue',
            data: [10000, 11000, 12000, 13000, 14000],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Expenses',
            data: [8000, 8500, 9000, 9500, 10000],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          }
        ]
      }
    }),

    // Net Worth Chart
    React.createElement(Bar, {
      data: {
        labels: Array.from({ length: 5 }, (_, i) => 2024 + i),
        datasets: [
          {
            label: 'Net Worth',
            data: [20000, 22500, 25500, 28500, 31000],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Hypothetical Net Worth',
            data: showHypothetical ? [21000, 24000, 27500, 31000, 35000] : [],
            borderColor: 'rgba(54, 162, 235, 0.5)',
            backgroundColor: 'transparent',
            type: 'line',
            borderDash: [5, 5],
          }
        ]
      }
    }),

    React.createElement(AddEntryForm, { onSubmit: handleAddEntry }),
    React.createElement(HypotheticalForm, { onSubmit: handleAddHypothetical }),
    React.createElement('label', null,
      React.createElement('input', {
        type: 'checkbox',
        checked: showHypothetical,
        onChange: () => setShowHypothetical(!showHypothetical)
      }),
      ' Show Hypotheticals'
    )
  );
}

export default App;
