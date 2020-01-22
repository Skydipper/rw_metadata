
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { RESOURCES } = require('app.constants');
const { STATUS } = require('app.constants');

const Metadata = new Schema({

    dataset: { type: String, required: true, trim: true },
    application: { type: String, required: true, trim: true },
    resource: {
        id: { type: String, required: true, trim: true },
        type: {
            type: String, required: true, trim: true, enum: RESOURCES
        }
    },
    userId: { type: String, required: true, trim: true },
    columns: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: STATUS, default: 'published' },
    name: { type: String, required: true, trim: true, index: true },
    altName: { type: String, required: false, trim: true, index: true, default: null },
    description: { type: String, required: true, trim: true },
    creator: { type: Schema.Types.Mixed, default: null },
    variableMeasured: { type: Schema.Types.Mixed, default: null },
    citation: { type: String, required: false, trim: true, default: null },
    identifier: { type: String, required: false, trim: true, default: null },
    keywords: [
        { type: String, required: true, trim: true }
    ],
    language: { type: String, required: false, trim: true, default: 'en' },
    license: { type: String, required: true, trim: true },
    spatialCoverage: { type: Schema.Types.Mixed, default: null },
    temporalCoverage: { type: Schema.Types.Mixed, default: null },
    version: { type: String, required: false, trim: true, default: '1.0.0' },
    url: { type: String, required: false, trim: true, default: null },
    distribution: { type: Schema.Types.Mixed, default: null },
    info: { type: Schema.Types.Mixed, default: {} },
    dataLineage: { type: Schema.Types.Mixed, default: null }


});

Metadata.index(
    {
        name: 'text',
        description: 'text',
    }, {
        name: 'TextIndex',
        default_language: 'english',
        language_override: 'none',
        weights:
            {
                name: 2,
                description: 1
            }
    }
);

module.exports = mongoose.model('Metadata', Metadata);
