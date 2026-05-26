import { Suspense, lazy, useEffect } from 'react'

import { Toaster } from 'react-hot-toast'

import { Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'

import Footer from './components/layout/Footer'

import Navbar from './components/layout/Navbar'

import GuestRoute from './components/layout/GuestRoute'

import ProtectedRoute from './components/layout/ProtectedRoute'

import StaffLayout from './components/layout/StaffLayout'

import LoadingSpinner from './components/ui/LoadingSpinner'

import ReceiptPreviewHost from './components/receipt/ReceiptPreviewHost'
import InstallPrompt from './components/pwa/InstallPrompt'

import { STAFF_ROLES } from './utils/constants'



const Cart = lazy(() => import('./pages/Cart'))

const Checkout = lazy(() => import('./pages/Checkout'))

const Home = lazy(() => import('./pages/Home'))

const Contact = lazy(() => import('./pages/Contact'))

const Login = lazy(() => import('./pages/Login'))

const Menu = lazy(() => import('./pages/Menu'))

const OrderTracking = lazy(() => import('./pages/OrderTracking'))

const Register = lazy(() => import('./pages/Register'))

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

const ManageMenu = lazy(() => import('./pages/admin/ManageMenu'))

const ManageOrders = lazy(() => import('./pages/admin/ManageOrders'))

const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'))

const Reports = lazy(() => import('./pages/admin/Reports'))

const CashierDashboard = lazy(() => import('./pages/cashier/CashierDashboard'))

const PaymentConfirmation = lazy(() => import('./pages/cashier/PaymentConfirmation'))

const CustomerDashboard = lazy(() => import('./pages/customer/CustomerDashboard'))

const OrderHistory = lazy(() => import('./pages/customer/OrderHistory'))

const Profile = lazy(() => import('./pages/Profile'))

const KitchenDisplay = lazy(() => import('./pages/kitchen/KitchenDisplay'))

const StaffHome = lazy(() => import('./pages/staff/StaffHome'))



const CashierPaymentRedirect = () => {
  const { orderId } = useParams()
  return <Navigate to={`/staff/cashier/payment-confirmation/${orderId}`} replace />
}

const ScrollToTop = () => {

  const { pathname } = useLocation()



  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    window.scrollTo({ top: 0, behavior: isMobile ? 'auto' : 'smooth' })
  }, [pathname])



  return null

}



const RouteFallback = ({ label = 'Bogga waa la soo rarayaa' }) => {

  return (

    <div className="container-shell py-16">
      <LoadingSpinner label={label} />
    </div>

  )

}



const MainLayout = () => {

  return (

    <div className="flex min-h-[100dvh] flex-col">

      <Navbar />

      <main className="min-h-0 flex-1">

        <Suspense fallback={<RouteFallback />}>

          <Outlet />

        </Suspense>

      </main>

      <Footer />

    </div>

  )

}



const App = () => {

  return (

    <>

      <InstallPrompt />

      <ScrollToTop />

      <ReceiptPreviewHost />

      <Toaster

        position="top-center"

        containerStyle={{ top: 'max(12px, env(safe-area-inset-top))' }}

        toastOptions={{

          style: {

            background: '#455A64',

            color: '#FAF8F5',

            border: '1px solid rgba(251, 192, 45, 0.35)',

            boxShadow: '0 18px 40px rgba(0,0,0,0.35)',

          },

          success: { iconTheme: { primary: '#FBC02D', secondary: '#263238' } },

          error: { iconTheme: { primary: '#B71C1C', secondary: '#FAF8F5' } },

        }}

      />

      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/menu" element={<Menu />} />

          <Route element={<GuestRoute />}>

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

          </Route>

          <Route path="/cart" element={<Cart />} />



          <Route element={<ProtectedRoute roles={['Customer']} />}>

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/dashboard" element={<CustomerDashboard />} />

            <Route path="/orders/history" element={<OrderHistory />} />

            <Route path="/profile" element={<Profile />} />

          </Route>



          <Route element={<ProtectedRoute roles={['Customer', ...STAFF_ROLES]} />}>

            <Route path="/orders/:id" element={<OrderTracking />} />

          </Route>

        </Route>



        <Route element={<ProtectedRoute roles={STAFF_ROLES} />}>

          <Route element={<StaffLayout />}>

            <Route path="/staff" element={<StaffHome />} />



            <Route element={<ProtectedRoute roles={['Admin']} />}>

              <Route path="/staff/dashboard" element={<AdminDashboard />} />

              <Route path="/staff/menu" element={<ManageMenu />} />

              <Route path="/staff/users" element={<ManageUsers />} />

              <Route path="/staff/reports" element={<Reports />} />

            </Route>



            <Route element={<ProtectedRoute roles={['Admin', 'Cashier', 'KitchenStaff']} />}>

              <Route path="/staff/orders" element={<ManageOrders />} />

            </Route>



            <Route element={<ProtectedRoute roles={['Cashier']} />}>

              <Route path="/staff/cashier" element={<CashierDashboard />} />

              <Route

                path="/staff/cashier/payment-confirmation/:orderId"

                element={<PaymentConfirmation />}

              />

            </Route>



            <Route element={<ProtectedRoute roles={['KitchenStaff']} />}>

              <Route path="/staff/kitchen" element={<KitchenDisplay />} />

            </Route>

            <Route path="/staff/profile" element={<Profile staffMode />} />

          </Route>

        </Route>



        {/* Jihooyin hore — dib u habeyn */}

        <Route path="/admin" element={<Navigate to="/staff/dashboard" replace />} />

        <Route path="/admin/menu" element={<Navigate to="/staff/menu" replace />} />

        <Route path="/admin/orders" element={<Navigate to="/staff/orders" replace />} />

        <Route path="/admin/users" element={<Navigate to="/staff/users" replace />} />

        <Route path="/admin/reports" element={<Navigate to="/staff/reports" replace />} />

        <Route path="/cashier" element={<Navigate to="/staff/cashier" replace />} />

        <Route path="/cashier/payment-confirmation/:orderId" element={<CashierPaymentRedirect />} />

        <Route path="/kitchen" element={<Navigate to="/staff/kitchen" replace />} />



        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </>

  )

}



export default App


