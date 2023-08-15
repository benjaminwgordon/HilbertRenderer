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
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Ben Gordon" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://benjaminwgordon.dev/" />
        <meta property="og:image" content="preview.png" />
        <meta
          property="og:description"
          content="Benjamin Gordon's personal site and development blog"
        />
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
