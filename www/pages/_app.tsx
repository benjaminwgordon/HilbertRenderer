import Head from "next/head";
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
    <>
      <Head>
        <title>Ben Gordon</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <div className="bg-black h-full min-h-screen w-screen">
        <header>
          <Navbar />
        </header>
        <section className="h-full min-h-screen relative ">
          <Layout Component={Component} pageProps={pageProps} />
        </section>
      </div>
    </>
  );
}
