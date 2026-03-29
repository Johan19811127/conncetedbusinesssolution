import { Schema, model, models, Types } from 'mongoose';

const ContactSchema = new Schema(
  {
    organizationId: { type: Types.ObjectId, ref: 'Organization', required: true, index: true },
    groupId: { type: Types.ObjectId, ref: 'Group' },
    tagIds: [{ type: Types.ObjectId, ref: 'Tag' }],

    businessName: { type: String, trim: true },
    contactFirstName: { type: String, trim: true },
    contactLastName: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    telephone: { type: String, trim: true },
    mobilePhone: { type: String, trim: true },
    website: { type: String, trim: true },

    streetName: { type: String, trim: true },
    streetNumber: { type: String, trim: true },
    postalCode: { type: String, trim: true, index: true },
    city: { type: String, trim: true, index: true },
    stateRegion: { type: String, trim: true },
    country: { type: String, trim: true },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },

    source: { type: String, enum: ['manual', 'import', 'api'], default: 'manual' },
    externalId: { type: String, trim: true },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    updatedBy: { type: Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

ContactSchema.index({ organizationId: 1, externalId: 1 }, { unique: true, sparse: true });
ContactSchema.index({ organizationId: 1, email: 1 });
ContactSchema.index({ organizationId: 1, telephone: 1 });
ContactSchema.index({ location: '2dsphere' });

export const ContactModel = models.Contact || model('Contact', ContactSchema);
