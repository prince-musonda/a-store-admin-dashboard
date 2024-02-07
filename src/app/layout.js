import { Inter } from "next/font/google";
import "./globals.css";
import CustomLayout from "./components/CustomLayout.js";
import { LoadingAnimationContextProvider } from "./context/loadingAnimationContext";
import { ProductsListProvider } from "./context/productsListContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "A Store Dashboard",
  description: "A store Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingAnimationContextProvider>
          <CustomLayout>
            <ProductsListProvider>{children}</ProductsListProvider>
          </CustomLayout>
        </LoadingAnimationContextProvider>
      </body>
    </html>
  );
}
