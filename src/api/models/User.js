import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nome: String,
  token: String,
  matricula: String,
  foto: String,
  cargo: String
});

module.exports = mongoose.model('User', UserSchema);

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - nome
 *       - matricula
 *       - foto 
 *       - cargo
 *     properties:
 *       nome:
 *         type: string
 *       matricula:
 *         type: string
 *       foto:
 *         type: string
 *       cargo:
 *         type: string
 * 
 *   UserGET:
 *     type: object
 *     required:
 *       - _id
 *       - nome
 *       - matricula
 *       - foto 
 *       - cargo
 *       - __v
 *     properties:
 *       _id:
 *         type: string
 *       nome:
 *         type: string
 *       matricula:
 *         type: string
 *       foto:
 *         type: string
 *       cargo:
 *         type: string     
 *       __v:
 *         type: string
 * 
 *   Users:
 *     type: array
 *     items:
 *       $ref: "#/definitions/UserGET"
 */
