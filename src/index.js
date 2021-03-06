import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { WelcomePage } from './routes/WelcomePage';
import ToDoPage from './routes/ToDoPage';
import Credits from './routes/Credits';
import ShareToDo from './routes/ShareToDo';
import NotFound from './routes/NotFound';




import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/todopage" element={<ToDoPage />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/share:docid" element={<ShareToDo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
