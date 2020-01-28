const { ROLES } = require('./test.constants');

function deserializeDataset(response) {
    return response.body.data;
}

function validateMetadata(actual, expected) {
    actual.should.have.property('attributes').and.be.a('object');

    actual.attributes.should.have.property('dataset').and.equal(expected.dataset);
    actual.attributes.should.have.property('language').and.equal(expected.language);
    actual.attributes.should.have.property('name').and.equal(expected.name);
    actual.attributes.should.have.property('description').and.equal(expected.description);
    actual.attributes.should.have.property('info').and.be.a('object');
    actual.attributes.should.have.property('columns').and.be.a('object');
    actual.attributes.should.have.property('status').and.be.a('string');
    actual.attributes.should.have.property('createdAt').and.be.a('string');
    actual.attributes.should.have.property('updatedAt').and.be.a('string');
    actual.attributes.should.have.property('application').and.be.a('string')
    actual.attributes.should.have.property('license').and.be.a('string')
    actual.attributes.should.have.property('version').and.be.a('string')
    actual.attributes.should.have.property('url').and.be.a('string')
    actual.attributes.should.have.property('distribution').and.be.a('object')
    actual.attributes.should.have.property('dataLineage').and.be.a('object')
    actual.attributes.should.have.property('spatialCoverage').and.be.a('string')
    actual.attributes.should.have.property('temporalCoverage').and.be.a('string')
    actual.attributes.should.have.property('altName').and.be.a('string')
    actual.attributes.should.have.property('citation').and.be.a('string')
    actual.attributes.should.have.property('identifier').and.be.a('string')
    actual.attributes.should.have.property('keywords').and.be.an('array')
    
    // Making gets fail
    actual.attributes.should.have.property('creator').and.be.a('object')
    actual.attributes.should.have.property('variableMeasured').and.be.a('object')


    new Date(actual.attributes.createdAt).should.beforeTime(new Date());
    new Date(actual.attributes.updatedAt).should.beforeTime(new Date());
}

const getUUID = () => Math.random().toString(36).substring(7);

const createMetadata = () => {
    const uuid = getUUID();

    return {
        dataset: uuid,
        application: 'rw',
        resource: {
            id: uuid,
            type: 'dataset'
        },
        userId: ROLES.ADMIN.id,
        language: 'en',
        name: `Fake metadata ${uuid} name`,
        altName: `Fake metadata ${uuid} altname`,
        description: `Fake metadata ${uuid} description`,
        source: `Fake source ${uuid}`,
        citation: `Fake citation ${uuid}`,
        creator: {
            too: 'nar'
        },
        identifier: `Fake identifier ${uuid}`,
        license: `Fake license ${uuid}`,
        url: `Fake url ${uuid}`,
        dataLineage: {
            woo: 'zar'
        },
        distribution: {
            loo: 'par'
        },
        version: 'v1',
        info: {
            too: 'par'
        },
        columns: {
            noo: 'zar'
        },
        spatialCoverage: `Fake metadata ${uuid} spatialCoverage`,
        temporalCoverage: `Fake metadata ${uuid} temporalCoverage`,
        applicationProperties: {
            hoo: 'iar'
        },
        variableMeasured: {
            zoo: 'war'
        },
        keywords: ['foo', 'bar'],
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'published'
    };
};

module.exports = {
    deserializeDataset,
    validateMetadata,
    createMetadata
};
