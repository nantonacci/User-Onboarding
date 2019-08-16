import React from 'react';
import OnboardingForm from './Form.js';

import './reset.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1>User Onboarding</h1>
      <p className="intro">Welcome to the team! Please take a moment to complete our onboarding form. Once you're done, your information should appear below.</p>
      <OnboardingForm />
    </div>
  );
}

export default App;
