import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  token: String,
  registry: String,
  photo: String,
  role: String
},
{ 
  timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - name
 *       - registry
 *       - photo 
 *       - role
 *     properties:
 *       name:
 *         type: string
 *       registry:
 *         type: string
 *       photo:
 *         type: string
 *       role:
 *         type: string
 * 
 *   UserGET:
 *     type: object
 *     required:
 *       - _id
 *       - name
 *       - registry
 *       - photo 
 *       - role
 *       - __v
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       registry:
 *         type: string
 *       photo:
 *         type: string
 *       role:
 *         type: string     
 *       __v:
 *         type: string
 * 
 *   Users:
 *     type: array
 *     items:
 *       $ref: "#/definitions/UserGET"
 */