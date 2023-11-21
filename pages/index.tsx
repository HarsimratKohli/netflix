import { getSession, signOut } from "next-auth/react"
import { NextPageContext } from "next"
import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
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
    props:{}
  }
}

export default function Home() {

  const { data: user} = useCurrentUser();


  return (
    <>
      <p className="color text-green-500 text-5xl">Netflix Clone</p>
      <p className="text-white"> Logged in as: { user?.name }</p>
      <button className="h-10 w-full bg-red-500" onClick={() => signOut()}>Logout!</button>
    </>
  )
}
