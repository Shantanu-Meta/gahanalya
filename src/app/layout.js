import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  UseUserContext  from "@contextAPI/userContext/UseUserContext";
import UseProductContext from "@contextAPI/productContext/useProductContext";
import UseAdminContext from "@contextAPI/adminContext/useAdminContext";
import UseAllProductsContext from "@contextAPI/allProductsContext/useAllProductContext";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gahanalya",
  description: "A jewellery shop application",
};
export default function RootLayout({ children }) {
  
  return (
    <UseAdminContext>
    <UseAllProductsContext>
    <UseUserContext>
    <UseProductContext>
    <html lang="en">
      <head>
        <link
        href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
        rel="stylesheet"
      />
      <link rel="shortcut icon" href="/assets/LOGO-phone.png" type="image/x-icon"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Economica:ital,wght@0,400;0,700;1,400;1,700&family=Mukta:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"></link>

      </head>
      <body className={`${inter.className} bg-[#F2EFE9] economica-regular `}>
            <Navbar/>
            {children}
            <Analytics />
            <Footer/>
            <ToastContainer autoClose={2000}/>
      </body>
    </html>
    </UseProductContext>
    </UseUserContext>
    </UseAllProductsContext>
    </UseAdminContext>
  );
}
