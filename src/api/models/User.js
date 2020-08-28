import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  registry: String,
  photo: Buffer,
  role: String
}, 
{ 
  timestamps: true,
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
 *       - registry
 *     properties:
 *       name:
 *         type: string
 *       registry:
 *         type: string
 *       photo:
 *         type: string
 *       registry:
 *         type: string
 * 
 *   UserGET:
 *     type: object
 *     required:
 *       - _id
 *       - name
 *       - registry
 *       - photo 
 *       - registry
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
 *       registry:
 *         type: string     
 *       __v:
 *         type: string
 * 
 *   User:
 *     type: array
 *     items:
 *       $ref: "#/definitions/UserGET"
 */
