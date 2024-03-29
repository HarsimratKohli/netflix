import { getSession } from "next-auth/react"
import { NextPageContext } from "next"
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  try{
    const session = await getSession(context);
    if(!session){
      return {
        redirect:{
          destination: '/auth',
          permanent: false
        }
      }
    }
    return {
      props: {}
    }
  } catch(error){
    console.log(error)
  }
}

export default function Home() {

  const { data: movies=[]} = useMovieList();
  const { data: favorites=[]} = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar></Navbar>
      <Billboard></Billboard>
      <div className="pb-40">
        <MovieList title="Trending now" data={movies}/>
        <MovieList title="My list" data={favorites}/>
      </div>
    </>
  )
}
