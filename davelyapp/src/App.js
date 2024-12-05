import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Inputs from './inputs';

function App() {
  const [financialData, setFinancialData] = useState({
    assets: [],
    liabilities: []
  });
  const [showHypothetical, setShowHypothetical] = useState(false);

  // Calculate totals
  const totalAssets = financialData.assets.reduce((sum, asset) => 
    sum + (Number(asset.value) || 0), 0);
    
  const totalLiabilities = financialData.liabilities.reduce((sum, liability) => 
    sum + (Number(liability.value) || 0), 0);

  const netWorth = totalAssets - totalLiabilities;

  const handleUpdate = (assets, liabilities) => {
    setFinancialData({ assets, liabilities });
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <div>
              <h1>Financial Dashboard</h1>
              <div>
                <h2>Total Assets: ${totalAssets}</h2>
                <h2>Total Liabilities: ${totalLiabilities}</h2>
                <h2>Net Worth: ${netWorth}</h2>
                
                {showHypothetical && (
                  <div>
                    <h3>Hypothetical Net Worth Projections:</h3>
                    <p>In 5 years: ${netWorth * 1.2}</p>
                    <p>In 10 years: ${netWorth * 1.4}</p>
                    <p>In 15 years: ${netWorth * 1.6}</p>
                    <p>In 20 years: ${netWorth * 1.8}</p>
                    <p>In 25 years: ${netWorth * 2.0}</p>
                  </div>
                )}
                
                <button onClick={() => setShowHypothetical(!showHypothetical)}>
                  {showHypothetical ? 'Hide Projections' : 'Show Projections'}
                </button>
                
                <Link to="/inputs">Go to Inputs</Link>
              </div>
            </div>
          </Route>
          <Route path="/inputs">
            <Inputs onUpdate={handleUpdate} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
