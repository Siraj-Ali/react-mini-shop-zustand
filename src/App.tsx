
import './App.css'
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Wishlist } from './pages/Whishlist';
import Header from './components/Header';
import { Login } from './pages/Login';
import { useAuthStore } from './stores/authStore';
import { PlaceOrder } from './pages/PlaceOrder';

function Protected({ children }: any) {
  const user = useAuthStore((state) => state.user);

  if(!user) return <Navigate to="/login" />

  return children
}

function App() {

  return (
    <>
      <Header />
      
      <Routes>
        <Route path='/' element={<Products />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/products/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Protected><Cart /></Protected>} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/login' element={<Login />} />
        <Route path='/checkout' element={<PlaceOrder />} />
        <Route path='*' element={<h2>Page not found</h2>} />
      </Routes>
    </>
  )
}

export default App
