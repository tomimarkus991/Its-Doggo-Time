import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSubscribeToGroupInserts } from '../hooks/subcribe';
import Router from './Router';

const Index = () => {
  // useSubscribeToGroupInserts();

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};
export default Index;
