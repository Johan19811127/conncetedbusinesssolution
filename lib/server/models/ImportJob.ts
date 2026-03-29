import { Schema, model, models, Types } from 'mongoose';

const ImportJobSchema = new Schema(
  {
    organizationId: { type: Types.ObjectId, ref: 'Organization', required: true, index: true },
    uploadedBy: { type: Types.ObjectId, ref: 'User' },
    fileName: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['uploaded', 'mapping', 'processing', 'completed', 'failed'],
      default: 'uploaded',
      index: true
    },
    delimiter: { type: String, default: ',' },
    totalRows: { type: Number, default: 0 },
    successRows: { type: Number, default: 0 },
    failedRows: { type: Number, default: 0 },
    reportJson: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export const ImportJobModel = models.ImportJob || model('ImportJob', ImportJobSchema);
