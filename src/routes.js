import { Router } from 'express';

import {
    UserController,
    LoginController,
    CallController,
} from './api/controllers';

import { Auth } from './middlewares';

const routes = Router();

routes.get('/', (req, resp) => {
  resp.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>API DEVs - Accellog</title>
        </head>
        <body>
            <h1>API DEVs - Accellog</h1>
            <a href="/api/docs">Documentação API</a>
        </body>
    </html>`);
});

/**
 * @swagger
 * /users:
 *   get:
 *     description: Busque todos os usuários.
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User.
 *         schema:
 *           $ref: "#/definitions/Users"
 *       401:
 *         description: Não autorizado!
 *       404:
 *         description: Requisição não encontrada.
 *       500:
 *         description: Erro interno na requisição.
 */
routes.get('/users', Auth.authenticate, UserController.indexAll);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Rota POST para cadastrar usuário.
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
 *     responses:
 *       201:
 *         description: User.
 *       400:
 *         description: JSON informado inválido!
 *       401:
 *         description: Não autorizado!
 *       404:
 *         description: Requisição não encontrada.
 *       500:
 *         description: Erro interno na requisição.
 */
routes.post('/users', UserController.store);

routes.get('/users/:registry', Auth.authenticate, UserController.indexOne);

routes.post('/login', LoginController.auth);

/**
 * @swagger
 * /call:
 *   post:
 *     description: Route POST for register call
 *     tags:
 *       - Call
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Call id.
 *       400:
 *         description: JSON informado inválido!
 *       401:
 *         description: Não autorizado!
 *       404:
 *         description: Requisição não encontrada.
 *       500:
 *         description: Erro interno na requisição.
 */
routes.post('/call', Auth.authenticate, CallController.store);

export default routes;
