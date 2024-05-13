import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <>
      <Head>
        <title>Agricultures</title>
        <meta
          name="description"
          content=""
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />  
    </>
  );
}

export default Home;