import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Movie } from "../typings";

interface Props {
  movie: Movie;
}
function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <div
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      className="relative md:h-[30rem] h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:min-w-[300px] md:hover:scale-105"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="rounded-xl object-cover md:rounded-2xl"
        layout="fill"
      />
    </div>
  );
}

export default Thumbnail;
