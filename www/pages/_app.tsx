import Navbar from "../components/Navbar";
import "globals.css";

export default function App({ Component, pageProps }) {
  const Layout = ({ Component, pageProps }) => {
    if (Component.getLayout) {
      return Component.getLayout(<Component {...pageProps} />);
    } else {
      return <Component {...pageProps} />;
    }
  };

  return (
    <div className="bg-gray-50 h-full min-h-screen">
      <header>
        <Navbar />
      </header>
      <section className="h-full min-h-screen relative ">
        <Layout Component={Component} pageProps={pageProps} />
      </section>
    </div>
  );
}
