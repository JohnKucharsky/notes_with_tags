import React from 'react'
import ReactDOM from 'react-dom/client'
import './core/index.css'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import { NotesList } from './routes/NotesList/NotesList'
import { NoteLayout } from './layouts/NoteLayout'
import { ShowNote } from './routes/ShowNote/ShowNote'
import { NewAndEditNote } from './routes/NewAndEditNote/NewAndEditNote'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <NotesList />,
            },
            {
                path: 'new',
                element: <NewAndEditNote />,
            },
            {
                path: ':id',
                element: <NoteLayout />,
                children: [
                    {
                        index: true,
                        element: <ShowNote />,
                    },
                    {
                        path: 'edit',
                        element: <NewAndEditNote edit />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        loader: () => redirect('/'),
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

reportWebVitals()
