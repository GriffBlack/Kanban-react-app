// import Button from './components/Board/Button/ButtonBoard.js';
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Header} from './components/Header/Header.jsx';
import {Footer} from './components/Footer/Footer.jsx';
import { Board } from './components/Board/Board.jsx';
import { CardInner } from './components/Board/CardInner/CardInner.jsx';
import TaskContextProvider from './tasks/TaskContext.js';
import './App.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Board/>
    },
    {
        path: "/tasks/:cardId",
        element: <CardInner/>
    }
    ])

function App() {
  return (
    <div className="App">
      <TaskContextProvider>
        <Header />
        <main>
            <RouterProvider router={router} />
        </main>
        <Footer />
      </TaskContextProvider>
    </div>
  );
}

export default App;
