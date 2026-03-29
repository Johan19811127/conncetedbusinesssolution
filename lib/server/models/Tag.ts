import { Schema, model, models, Types } from 'mongoose';

const TagSchema = new Schema(
  {
    organizationId: { type: Types.ObjectId, ref: 'Organization', required: true, index: true },
    name: { type: String, required: true, trim: true },
    colorHex: { type: String, trim: true }
  },
  { timestamps: true }
);

TagSchema.index({ organizationId: 1, name: 1 }, { unique: true });

export const TagModel = models.Tag || model('Tag', TagSchema);
