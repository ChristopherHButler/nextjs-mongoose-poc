// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { HttpMethods, User as IUser } from '../../../types';
import { connectMongo } from '../../../utils/connect';
import { User } from '../../../models/user';


interface AllUsers {
  users: IUser[];
}

interface SingleUser {
  user: IUser;
}

interface BadRequest {
  message: string;
}

type HandlerResponse = AllUsers | SingleUser | BadRequest;


export default async function handler(req: NextApiRequest, res: NextApiResponse<HandlerResponse>) {
  try {
    const { body, method } = req;
    const { name, email, password } = body;

    // connect to db. Is this the best place to do this?
    console.log('connecting to db...');
    await connectMongo();
    console.log('db connected!!');

    // get 
    if (method === HttpMethods.GET) {
      console.log('getting all users...');
      const users = await User.find({});

      return res.status(200).json({ users });
    }

    if (method === HttpMethods.POST) {

      console.log('creating new user...');

      const newUser = await User.create({
        name,
        email,
        password
      });

      console.log('new user: ', newUser);

      res.status(201).json({ user: newUser });


    } else {
      res.status(400).json({ message: 'Bad Request - req must be of type POST' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};