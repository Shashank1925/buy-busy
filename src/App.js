import { CustomProvider } from './pages/customProvider';
import { RouterProvider } from 'react-router-dom';
import mainRoutes from './pages/mainRoutes';
// import { UploadComponent } from './firebaseInit';
import CustomSignInProvider from './pages/SignIn/customSignInProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <CustomProvider>
      <CustomSignInProvider>
        <RouterProvider router={mainRoutes} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {/* <UploadComponent /> */}
      </CustomSignInProvider>
    </CustomProvider>
  );
}
export default App;
