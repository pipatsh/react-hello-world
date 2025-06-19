import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HelloWorld from './components/HelloWorld';
import PayWiseApp from './components/PayWise/PayWiseApp';
import TransferFlow from './components/PayWise/TransferFlow';
import TransactionHistory from './components/PayWise/TransactionHistory';
import TransactionDetails from './components/PayWise/TransactionDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hello" element={<HelloWorld />} />
          <Route path="/paywise" element={<PayWiseApp />} />
          <Route path="/paywise/transfer" element={<TransferFlow />} />
          <Route path="/paywise/history" element={<TransactionHistory />} />
          <Route path="/paywise/transaction/:id" element={<TransactionDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;