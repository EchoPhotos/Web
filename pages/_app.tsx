import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/style.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>My App</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
export default App;
