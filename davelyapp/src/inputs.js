import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './Inputs.css';

function Inputs({ onUpdate, history }) {
  const [assets, setAssets] = useState([{ 
    name: '', 
    value: '',
    monthlyRevenue: '',
    monthlyCashFlow: '',
    annualRevenue: '',
    annualCashFlow: ''
  }]);
  const [liabilities, setLiabilities] = useState([{ 
    name: '', 
    monthlyCost: '',
    annualCost: ''
  }]);

  useEffect(() => {
    onUpdate(assets, liabilities);
  }, [assets, liabilities, onUpdate]);

  const addAsset = () => {
    setAssets([...assets, { 
      name: '', 
      value: '',
      monthlyRevenue: '',
      monthlyCashFlow: '',
      annualRevenue: '',
      annualCashFlow: ''
    }]);
  };

  const addLiability = () => {
    setLiabilities([...liabilities, { 
      name: '', 
      monthlyCost: '',
      annualCost: ''
    }]);
  };

  const handleAssetChange = (index, field, value) => {
    const newAssets = [...assets];
    if (field === 'value' || field.includes('Revenue') || field.includes('CashFlow')) {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        value = Math.round(numValue);
      }
    }
    newAssets[index][field] = value;
    setAssets(newAssets);
  };

  const handleLiabilityChange = (index, field, value) => {
    const newLiabilities = [...liabilities];
    if (field.includes('Cost')) {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        value = Math.round(numValue);
      }
    }
    newLiabilities[index][field] = value;
    setLiabilities(newLiabilities);
  };

  return (
    <div>
      <header>
        <span className="back-arrow" onClick={() => history.push('/')}>←</span>
        <h1>Inputs</h1>
      </header>
      <main>
        <table className="assets">
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Value</th>
              <th>Monthly Revenue</th>
              <th>Monthly Cash Flow</th>
              <th>Annual Revenue</th>
              <th>Annual Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    placeholder="Asset Name"
                    value={asset.name}
                    onChange={(e) => handleAssetChange(index, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="10"
                    placeholder="Value"
                    value={asset.value}
                    onChange={(e) => handleAssetChange(index, 'value', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="10"
                    placeholder="Monthly Revenue"
                    value={asset.monthlyRevenue}
                    onChange={(e) => handleAssetChange(index, 'monthlyRevenue', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="10"
                    placeholder="Monthly Cash Flow"
                    value={asset.monthlyCashFlow}
                    onChange={(e) => handleAssetChange(index, 'monthlyCashFlow', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="10"
                    placeholder="Annual Revenue"
                    value={asset.annualRevenue}
                    onChange={(e) => handleAssetChange(index, 'annualRevenue', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="10"
                    placeholder="Annual Cash Flow"
                    value={asset.annualCashFlow}
                    onChange={(e) => handleAssetChange(index, 'annualCashFlow', e.target.value)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="6">
                <button onClick={addAsset}>+</button>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="liabilities">
          <thead>
            <tr>
              <th>Liability Name</th>
              <th>Monthly Cost</th>
              <th>Annual Cost</th>
            </tr>
          </thead>
          <tbody>
            {liabilities.map((liability, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    placeholder="Liability Name"
                    value={liability.name}
                    onChange={(e) => handleLiabilityChange(index, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="10"
                    placeholder="Monthly Cost"
                    value={liability.monthlyCost}
                    onChange={(e) => handleLiabilityChange(index, 'monthlyCost', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="10"
                    placeholder="Annual Cost"
                    value={liability.annualCost}
                    onChange={(e) => handleLiabilityChange(index, 'annualCost', e.target.value)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">
                <button className="add-liabilities" onClick={addLiability}>+</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default withRouter(Inputs);
