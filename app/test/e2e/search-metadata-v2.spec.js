/* eslint-disable no-unused-vars,no-undef */
const nock = require('nock');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiDatetime = require('chai-datetime');
const Metadata = require('models/metadata.model');

const should = chai.should();
const { validateMetadata, deserializeDataset, createMetadataInDB } = require('./utils');
const { getTestServer } = require('./test-server');

const requester = getTestServer();

chai.use(chaiHttp);
chai.use(chaiDatetime);

describe('Search metadata', () => {
    before(async () => {
        if (process.env.NODE_ENV !== 'test') {
            throw Error(`Running the test suite with NODE_ENV ${process.env.NODE_ENV} may result in permanent data loss. Please use NODE_ENV=test.`);
        }

        nock.cleanAll();
        Metadata.remove({}).exec();
    });

    it('Search for metadata by name in non matched name should return empty array', async () => {
        await createMetadataInDB({ name: 'metadata1' });

        const response = await requester.get('/api/v1/search?name=test');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(0);
    });

    it('Search for metadata by name in multiple names should return two results matched to it', async () => {
        const metadataOne = await createMetadataInDB({ name: 'metadata1' });
        const metadataTwo = await createMetadataInDB({ name: 'metadata2' });

        const response = await requester
            .get('/api/v1/search?name=metadata1,metadata2');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(2);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
        validateMetadata(deserializeDataset(response)[1], metadataTwo);
    });

    it('Search for metadata by name in one name should return only one result matched to it', async () => {
        const metadataOne = await createMetadataInDB({ name: 'metadata1' });
        await createMetadataInDB({ name: 'metadata2' });

        const response = await requester
            .get('/api/v1/search?name=metadata1');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(1);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
    });

    it('Search for metadata by altName in non matched name should return empty array', async () => {
        await createMetadataInDB({ altName: 'metadata1' });

        const response = await requester
            .get('/api/v1/search?altName=test');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(0);
    });

    it('Search for metadata by altName in multiple names should return two results matched to it', async () => {
        const metadataOne = await createMetadataInDB({ altName: 'metadata1' });
        const metadataTwo = await createMetadataInDB({ altName: 'metadata2' });

        const response = await requester
            .get('/api/v1/search?altName=metadata1,metadata2');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(2);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
        validateMetadata(deserializeDataset(response)[1], metadataTwo);
    });

    it('Search for metadata by altName in one name should return only one result matched to it', async () => {
        const metadataOne = await createMetadataInDB({ altName: 'metadata1' });
        await createMetadataInDB({ altName: 'metadata2' });

        const response = await requester
            .get('/api/v1/search?altName=metadata1');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(1);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
    });

    it('Search for metadata by description in non matched name should return empty array', async () => {
        await createMetadataInDB({ description: 'metadata1' });

        const response = await requester.get('/api/v1/search?description=test');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(0);
    });

    it('Search for metadata by description in multiple names should return two results matched to it', async () => {
        const metadataOne = await createMetadataInDB({ description: 'metadata1' });
        const metadataTwo = await createMetadataInDB({ description: 'metadata2' });

        const response = await requester
            .get('/api/v1/search?description=metadata1,metadata2');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(2);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
        validateMetadata(deserializeDataset(response)[1], metadataTwo);
    });

    it('Search for metadata by description in one name should return only one result matched to it', async () => {
        const metadataOne = await createMetadataInDB({ description: 'metadata1' });
        await createMetadataInDB({ description: 'metadata2' });

        const response = await requester
            .get('/api/v1/search?description=metadata1');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(1);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
    });

    it('Search for metadata by app in non matched name should return empty array', async () => {
        await createMetadataInDB({ application: 'metadata1' });

        const response = await requester.get('/api/v1/search?app=test');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(0);
    });

    it('Search for metadata by app in multiple names should return two results matched to it', async () => {
        const metadataOne = await createMetadataInDB({ application: 'metadata1' });
        const metadataTwo = await createMetadataInDB({ application: 'metadata2' });

        const response = await requester
            .get('/api/v1/search?app=metadata1,metadata2');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(2);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
        validateMetadata(deserializeDataset(response)[1], metadataTwo);
    });

    it('Search for metadata by app in one name should return only one result matched to it', async () => {
        const metadataOne = await createMetadataInDB({ application: 'metadata1' });
        await createMetadataInDB({ application: 'metadata2' });

        const response = await requester
            .get('/api/v1/search?app=metadata1');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(1);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
    });

    it('Search for metadata by url in non matched name should return empty array', async () => {
        await createMetadataInDB({ url: 'metadata1' });

        const response = await requester.get('/api/v1/search?url=test');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(0);
    });

    it('Search for metadata by url in multiple names should return two results matched to it', async () => {
        const metadataOne = await createMetadataInDB({ url: 'metadata1' });
        const metadataTwo = await createMetadataInDB({ url: 'metadata2' });

        const response = await requester
            .get('/api/v1/search?url=metadata1,metadata2');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(2);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
        validateMetadata(deserializeDataset(response)[1], metadataTwo);
    });

    it('Search for metadata by url in one name should return only one result matched to it', async () => {
        const metadataOne = await createMetadataInDB({ url: 'metadata1' });
        await createMetadataInDB({ url: 'metadata2' });

        const response = await requester
            .get('/api/v1/search?url=metadata1');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(1);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
    });

    it('Search for metadata by language in non matched name should return empty array', async () => {
        await createMetadataInDB({ language: 'en' });

        const response = await requester.get('/api/v1/search?language=ru');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(0);
    });

    it('Search for metadata by language in multiple names should return two results matched to it', async () => {
        const metadataOne = await createMetadataInDB({ language: 'en' });
        const metadataTwo = await createMetadataInDB({ language: 'ru' });

        const response = await requester
            .get('/api/v1/search?language=en,ru');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(2);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
        validateMetadata(deserializeDataset(response)[1], metadataTwo);
    });

    it('Search for metadata by language in one name should return only one result matched to it', async () => {
        const metadataOne = await createMetadataInDB({ language: 'en' });
        await createMetadataInDB({ language: 'ru' });

        const response = await requester
            .get('/api/v1/search?language=en');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(1);

        validateMetadata(deserializeDataset(response)[0], metadataOne);
    });

    it('Search for metadata by all available kes should return all matched result', async () => {
        // metadata in search range
        await createMetadataInDB({ name: 'test2' });
        await createMetadataInDB({ description: 'test2' });
        await createMetadataInDB({ altName: 'test2' });
        await createMetadataInDB({ application: 'skydipper2' });
        await createMetadataInDB({ url: 'test2' });
        await createMetadataInDB({ language: 'ru' });

        // metadata out search range
        await createMetadataInDB({ altName: 'test1' });
        await createMetadataInDB({ description: 'test1' });
        await createMetadataInDB({ name: 'test1' });
        await createMetadataInDB({ application: 'skydipper' });
        await createMetadataInDB({ language: 'en' });
        await createMetadataInDB({ url: 'test1' });

        const response = await requester
            .get('/api/v1/search?name=test2&description=test2&altName=test2&app=skydipper2&url=test2&language=ru');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(6);
    });

    it('Search for metadata by all available kes but with limit should return all matched result not more than the specified limit', async () => {
        // metadata in search range
        await createMetadataInDB({ name: 'test2' });
        await createMetadataInDB({ description: 'test2' });
        await createMetadataInDB({ altName: 'test2' });
        await createMetadataInDB({ application: 'skydipper2' });
        await createMetadataInDB({ url: 'test2' });
        await createMetadataInDB({ language: 'ru' });

        const response = await requester
            .get('/api/v1/search?name=test2&description=test2&altName=test2&app=skydipper2&url=test2&language=ru&limit=2');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(2);
    });

    it('Search for metadata by phrase which partially contains in fields: name, description, altName should return matched result', async () => {
        // metadata in search range
        await createMetadataInDB({ name: 'test name' });
        await createMetadataInDB({ description: 'test name' });
        await createMetadataInDB({ altName: 'test name' });

        // metadata out search range
        await createMetadataInDB({ application: 'skydipper2' });
        await createMetadataInDB({ url: 'test2' });
        await createMetadataInDB({ language: 'ru' });

        const response = await requester
            .get('/api/v1/search?phrase=test');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(3);
    });

    it('Search for metadata by phrase which contains in all fields should return matched result', async () => {
        await createMetadataInDB({ name: 'test name' });
        await createMetadataInDB({ description: 'test name' });
        await createMetadataInDB({ altName: 'test name' });
        await createMetadataInDB({ application: 'test name' });
        await createMetadataInDB({ url: 'test name' });
        await createMetadataInDB({ language: 'test name' });

        const response = await requester
            .get('/api/v1/search?phrase=test name');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(6);
    });

    it('Search for metadata by phrase which hasn\'t contains in all fields should return empty array', async () => {
        await createMetadataInDB({ name: 'test name' });
        await createMetadataInDB({ description: 'test name' });
        await createMetadataInDB({ altName: 'test name' });
        await createMetadataInDB({ application: 'test name' });
        await createMetadataInDB({ url: 'test name' });
        await createMetadataInDB({ language: 'test name' });

        const response = await requester
            .get('/api/v1/search?phrase=djskaldsaj');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(0);
    });

    it('Search for metadata by phrase which contains in all fields but with limit and the result shouldn\'t be more than limit', async () => {
        await createMetadataInDB({ name: 'test name' });
        await createMetadataInDB({ description: 'test name' });
        await createMetadataInDB({ altName: 'test name' });
        await createMetadataInDB({ application: 'test name' });
        await createMetadataInDB({ url: 'test name' });
        await createMetadataInDB({ language: 'test name' });

        const response = await requester
            .get('/api/v1/search?phrase=test name&limit=2');

        response.status.should.equal(200);
        response.body.should.have.property('data').and.be.a('array').with.lengthOf(2);
    });

    afterEach(() => {
        Metadata.remove({}).exec();

        if (!nock.isDone()) {
            throw new Error(`Not all nock interceptors were used: ${nock.pendingMocks()}`);
        }
    });
});
