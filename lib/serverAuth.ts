import { NextApiRequest } from "next";
import prismadb from '@/lib/prismadb';

import { getToken } from "next-auth/jwt";


const serverAuth = async( req: NextApiRequest) => {

    const secret = process.env.NEXTAUTH_JWT_SECRET;
    const token = await getToken({ req, secret })

    if (!token?.email) {
        throw new Error ('Not signed in : user not having email');
    }

    const currentUser = await prismadb.user.findUnique({
        where:{
            email: token?.email,
        }
    });

    if(!currentUser){
        throw new Error('Valid user not signed in')
    }

    return { currentUser };
}

export default serverAuth;