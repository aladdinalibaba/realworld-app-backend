import { Handler } from 'express';

export type Router = {
  method: 'post' | 'get' | 'delete' | 'patch' | 'put';
  path: string;
  handler: Handler;
  middlewares?: Handler[];
};
