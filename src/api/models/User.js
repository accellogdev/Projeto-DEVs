import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { 
    type: String
  },  
  registry: { 
    type: String
  },
  role: { 
    type: String
  },
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
 *       - role
 *     properties:
 *       name:
 *         type: string
 *       registry:
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
 *       - role
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       registry:
 *         type: string
 *       role:
 *         type: string     
 * 
 *   Users:
 *     type: array
 *     items:
 *       $ref: "#/definitions/UserGET"
 */
