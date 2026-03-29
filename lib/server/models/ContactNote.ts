import { Schema, model, models, Types } from 'mongoose';

const ContactNoteSchema = new Schema(
  {
    organizationId: { type: Types.ObjectId, ref: 'Organization', required: true, index: true },
    contactId: { type: Types.ObjectId, ref: 'Contact', required: true, index: true },
    authorUserId: { type: Types.ObjectId, ref: 'User' },
    noteText: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

ContactNoteSchema.index({ contactId: 1, createdAt: -1 });

export const ContactNoteModel = models.ContactNote || model('ContactNote', ContactNoteSchema);
