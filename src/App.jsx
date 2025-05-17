import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import List from './components/List'
import Header from './Layouts/Header/Header'
import PrivateRouter from './Utils/PrivateRouter'
import Login from './Auth/Login'

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Header/>,
      children:[
        {
          path:"/login",
          element:<Login/>
        },
        {
          element: <PrivateRouter/>,
          children:[
            {
              path:"/",
              element: <List/>
            }
          ]
        }
       
      ]
    }
  ])

  return (
   <>
    <RouterProvider router={router}/>
   </>
  )
}

export default App
