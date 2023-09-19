import React from "react";
// import TopBar from "./components/topbar/TopBar";
import Home from "./Pages/home/Home";
import Single from "./Pages/single/Single";
import Welcome from "./Pages/welcomePage/Welcome"
import Navbar from '../src/components/welcomePageComponents/Navbar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

function App() {

  
  return (
    // <Router>
    //   <Navbar/>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/article/:id" element= {<Single/>} />
    //     <Route path="/welcome" element={<Welcome />} />
    //   </Routes>
    // </Router>

    // <Router>
    //   <TopBar />
    //   <Routes>
    //     <Route path="/" element={<Outlet />}> {/* Wrap child routes with Outlet */}
    //       <Route path="/" element={<Home />} />
    //       <Route path="/welcome" element={<Welcome />} />
    //       <Route path="/article/:id" element={<Single />} />
    //     </Route>
    //   </Routes>
    // </Router>

    // <Router>
    //   <TopBar />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/article/:id" element={<Single />} />
    //     <Route path="/welcome/*" element={<Welcome />} /> {/* Updated route path */}
    //   </Routes>
    // </Router>

    // <Router>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <>
    //           <Navbar />
    //           <Home />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/article/:id"
    //       element={
    //         <>
    //           <Navbar />
    //           <Single />
    //         </>
    //       }
    //     />
    //   </Routes>
    //   <Route path="/welcome" element={<Welcome />} />
    // </Router>

    <Router>
      <Routes>
      <Route
          path="/"
          element={
            <>
              <Navbar />
              <Welcome />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/article/:id"
          element={
            <>
              <Navbar />
              <Single />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
