import { Schema, model, models } from 'mongoose';

const OrganizationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const OrganizationModel = models.Organization || model('Organization', OrganizationSchema);
