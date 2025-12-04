"use client";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider store={store}>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}






