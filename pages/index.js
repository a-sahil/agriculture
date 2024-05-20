import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import Frontpage from "../components/frontpage";

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
      {/* <Frontpage />  */}
    </>
  );
}

export default Home;