import Image from "next/image";
import { Movie } from "../typings";

interface Props {
  movie: Movie;
}
function Thumbnail({ movie }: Props) {
  return (
    <div className="relative md:h-[30rem] h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:min-w-[300px] md:hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="rounded-xl object-cover md:rounded-2xl"
        layout="fill"
      />
    </div>
  );
}

export default Thumbnail;
