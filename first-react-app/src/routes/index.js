import { Navigate } from "react-router-dom"

const Home = () => <p>Home</p>
const About = () => <p>About</p>

const elements = [
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/',
    element: <Navigate to="/home" />
  },
];

export default elements;