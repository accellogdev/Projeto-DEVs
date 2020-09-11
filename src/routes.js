import { Router } from 'express';
import Multer from 'multer';
import storage from './middlewares/upload';

const uploadMiddleware = Multer(storage());

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


/**
 * @swagger
 * /users/photo:
 *   post:
 *     description: Rota POST para cadastrar usuário.
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: photo
 *         description: User photo.
 *         in: formData
 *         required: true
 *         type: file
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
routes.post('/users/photo', Auth.authenticate, uploadMiddleware.single('photo'), UserController.uploadPhoto);

/**
 * @swagger
 * /users/{registry}:
 *   get:
 *     description: Rota POST para consultar usuário.
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: registry
 *         description: Registry.
 *         in: path
 *         required: true
 *         type: "string"
 *     responses:
 *       201:
 *         description: User.
 *         schema:
 *         $ref: "#/definitions/UserGET"
 *       400:
 *         description: JSON informado inválido!
 *       401:
 *         description: Não autorizado!
 *       404:
 *         description: Requisição não encontrada.
 *       500:
 *         description: Erro interno na requisição.
 */
routes.get('/users/:registry', Auth.authenticate, UserController.indexOne);


/**
 * @swagger
 * /login:
 *   post:
 *     description: Rota POST para realizar login.
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Auth
 *         description: Auth.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Login"
 *     responses:
 *       201:
 *         description: Object Login.
 *         schema:
 *           $ref: "#/definitions/LoginGET"
 *       400:
 *         description: JSON informado inválido!
 *       401:
 *         description: Não autorizado!
 *       404:
 *         description: Requisição não encontrada.
 *       500:
 *         description: Erro interno na requisição.
 */
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
