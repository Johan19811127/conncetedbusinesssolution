import { Schema, model, models, Types } from 'mongoose';

const GroupSchema = new Schema(
  {
    organizationId: { type: Types.ObjectId, ref: 'Organization', required: true, index: true },
    name: { type: String, required: true, trim: true },
    colorHex: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

GroupSchema.index({ organizationId: 1, name: 1 }, { unique: true });

export const GroupModel = models.Group || model('Group', GroupSchema);
