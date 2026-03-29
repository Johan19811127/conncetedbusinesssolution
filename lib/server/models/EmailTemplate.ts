import { Schema, model, models, Types } from 'mongoose';

const EmailTemplateSchema = new Schema(
  {
    organizationId: { type: Types.ObjectId, ref: 'Organization', required: true, index: true },
    name: { type: String, required: true, trim: true },
    subject: { type: String, trim: true },
    fromName: { type: String, trim: true },
    fromEmail: { type: String, trim: true },
    blockJson: { type: Schema.Types.Mixed, required: true },
    renderedHtml: { type: String },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    updatedBy: { type: Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const EmailTemplateModel = models.EmailTemplate || model('EmailTemplate', EmailTemplateSchema);
