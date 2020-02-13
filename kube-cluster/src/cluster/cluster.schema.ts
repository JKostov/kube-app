import * as mongoose from 'mongoose';

export const ClusterSchema = new mongoose.Schema({
  name: String,
  ipAddress: String,
  cpus: {
    type: Number,
    default: 0,
  },
  memory: {
    type: Number,
    default: 0,
  },
  storageMemory: {
    type: Number,
    default: 0,
  },
}, { timestamps: true, id: true });
