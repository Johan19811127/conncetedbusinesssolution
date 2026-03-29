import { Schema, model, models, Types } from 'mongoose';

const UserSchema = new Schema(
  {
    organizationId: { type: Types.ObjectId, ref: 'Organization', required: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    fullName: { type: String, trim: true },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], required: true }
  },
  { timestamps: true }
);

UserSchema.index({ organizationId: 1, email: 1 }, { unique: true });

export const UserModel = models.User || model('User', UserSchema);
