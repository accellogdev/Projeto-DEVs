import { Router } from 'express';
import Multer from 'multer';
import {
    UserController,
} from './api/controllers';

const uploadMiddleware = Multer(new UploadConfig().storage());

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
routes.get('/users', UserController.index);

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
 * /users:
 *   post:
 *     description: Rota POST para upload de foto.
 *     tags:
 *       - User
 *     "consumes": [                    
 *        "multipart/form-data"
 *      ],
 *      "produces": [
 *        "multipart/form-data"
 *      ],
 *     "parameters": [
 *       {
 *         "in": "formData",
 *         "name": "arquivo",
 *         "description": "Selecione um arquivo para upload.",
 *         "type": "file",
 *         "required": true                                             
 *       }
 *     ]
 *     responses:
 *       201:
 *         description: UploadPhoto.
 *       400:
 *         description: JSON informado inválido!
 *       401:
 *         description: Não autorizado!
 *       404:
 *         description: Requisição não encontrada.
 *       500:
 *         description: Erro interno na requisição.
 */
routes.post('/users/photo', uploadMiddleware.single('single'), UserController.uploadPhoto);

/**
 * @swagger
 * /usuario/autenticar:
 *   post:
 *     description: Rota POST para realizar a atutenticação de um usuário.
 *     tags:
 *       - usuário, autenticação
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: usuarioAutenticacao
 *         description: Usuario Autenticação.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/UsuarioAutenticacao"
 *     responses:
 *       200:
 *         description: Autenticação realizada com sucesso.
 *         schema:
 *           $ref: "#/definitions/Token"
 *       400:
 *         description: JSON informado inválido!
 *       401:
 *         description: Não autorizado!
 *       404:
 *         description: Requisição não encontrada.
 *       500:
 *         description: Erro interno na requisição.
 */
routes.post('/login', UserController.login);

export default routes;
