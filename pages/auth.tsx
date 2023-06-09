import Input from "@/components/input";
import { useCallback, useState } from "react";
import  axios from "axios";
import {signIn} from 'next-auth/react';
import { useRouter } from "next/router";

const Auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');
    const toggleVariant = useCallback(() => {
        setVariant( (currentVariant) => currentVariant === 'login'? 'register' : 'login');
    }, []);
    
    const login = useCallback(async () =>{
        try{
            await signIn('credentials',{
                email,
                password,
                redirect:false,
                callbackUrl:'/'
            });
            router.push('/');
        } catch(error){
            console.log(error)
        }

    },[email,password, router]);

    const register = useCallback(async () =>{
        try{
            await axios.post('/api/register',{
                email,
                name,
                password
            });
            login();
        } catch(error){
            console.log(error)
        }

    },[email,name,password, login]);


    return (
        <div className="relative h-full w-full bg-[url('/images/hero1.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black h-full w-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12"></img>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant =='login'? 'Sign In' : 'Register'}
                        </h2>
                        
                        <div className=" flex flex-col gap-4">
                            {variant =='register' &&
                            (
                            <Input id="name" label="Username" onChange={(ev:any)=>{setName(ev.target.value)}} type="string" value={name} />
                            )}
                            <Input id="email" label="Email" onChange={(ev:any)=>{setEmail(ev.target.value)}} type="email" value={email} />
                            <Input id="password" label="Password" onChange={(ev:any)=>{setPassword(ev.target.value)}} type="password" value={password} />
                        </div>
                        <button onClick={ variant == 'login' ? login : register} className=" bg-red-600 py-3 rounded-md w-full mt-10 hover:bg-red-700 text-white">{variant =='login'? 'Login' : 'Sign up'}</button>
                        <p className=" text-neutral-500 mt-12">{variant =='login'? 'First time using Netflix?' : 'Already have an account?'}
                            <span onClick={toggleVariant} className=" text-white ml-1 hover:underline cursor-pointer">{variant =='login'? 'Create an account': 'Login'}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;