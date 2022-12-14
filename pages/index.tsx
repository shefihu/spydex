import Head from "next/head";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import { Movie } from "../typings";
import requests from "../utils/requests";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  // products: Product[];
}
const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  const { signIn, signUp, loading } = useAuth();
  if (loading) return null;
  const showModal = useRecoilValue(modalState);
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-800/10 to-zinc-900 lg:h-[140vh]">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-[25rem]">
          <Row title="Action Movies" movies={actionMovies} />
          <Row title="Comedy Movies" movies={comedyMovies} />
          <Row title="Documentaries Movies" movies={documentaries} />
          <Row title="Horror Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Trending Movies" movies={trendingNow} />
          <Row title="Top Movies" movies={topRated} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
