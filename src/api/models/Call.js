import mongoose from 'mongoose';

const CallSchema = new mongoose.Schema({
  call: String,
},
{ 
  timestamps: true 
});

module.exports = mongoose.model('Call', CallSchema);

/**
 * @swagger
 * definitions:
 *   Call:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 */
