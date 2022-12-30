import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routers/Router/Router';

function App() {
  return (
    <div className="max-w-[1440px] mx-auto bg-base-200">
      <RouterProvider
        router={router}
      ></RouterProvider>
    </div>
  );
}

export default App;
