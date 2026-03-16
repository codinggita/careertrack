import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import InterviewCalendar from './pages/InterviewCalendar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css'

function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/applications" element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute>
            <InterviewCalendar />
          </ProtectedRoute>
        } />
      </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
