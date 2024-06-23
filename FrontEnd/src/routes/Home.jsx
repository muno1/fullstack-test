import React, { useState } from 'react';
import { Button } from 'antd';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentPanel from '../components/core/layout/ContentPanel';
import IncomePage from './IncomePage';
import ExpensePage from './ExpensePage';

const Home = () => {
  const [loading] = useState(false);
  const [button, setButton] = useState(false);
  const [totalAmountIncome, setTotalAmountIncome] = useState(0);
  const [totalAmountExpense, setTotalAmountExpense] = useState(0);

  const handleTotalIncomeChange = amount => {
    setTotalAmountIncome(amount);
  };
  const handleTotalExpenseChange = amount => {
    setTotalAmountExpense(amount);
  };

  return (
    <ContentPanel
      titleAction={
        <Button onClick={() => setButton(!button)} shape="circle" type="primary">
          <FontAwesomeIcon icon={faExchangeAlt} />
        </Button>
      }
      title="Dashboard"
      loading={loading}
    >
      {button ? (
        <ExpensePage onTotalExpenseChange={handleTotalExpenseChange} />
      ) : (
        <IncomePage onTotalAmountChange={handleTotalIncomeChange} />
      )}
    </ContentPanel>
  );
};

export default Home;
