//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import {Protected, Login } from './components/index.js'
import SignUp from './Pages/SignUp.jsx'
import AllPost from './Pages/AllPost.jsx'
import AddPost from './Pages/AddPost.jsx'
import EditPost from './Pages/EditPosts.jsx'
import Post from './Pages/Post.jsx'


const router = createBrowserRouter([
   {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignUp/>
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            {""}
            <AllPost/>
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            {""}
            <AddPost/>
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            {""}
            <EditPost/>
          </Protected>
        )
      },
      {
         path: "/post/:slug",
         element: <Post/>        
      }
    ]
   }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}> 
  <RouterProvider router={router}/>
   </Provider>
    
  
)
