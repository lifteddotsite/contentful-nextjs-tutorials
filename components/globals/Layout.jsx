import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='max-w-7xl mx-auto sm:px-6 lg:px-8'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
