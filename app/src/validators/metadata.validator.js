
const logger = require('logger');
const MetadataNotValid = require('errors/metadataNotValid.error');
const CloneNotValid = require('errors/cloneNotValid.error');
const { METADATA_FIELDS } = require('app.constants');

class MetadataValidator {

    static isArray(property) {
        if (property instanceof Array) {
            return true;
        }
        return false;
    }

    static isStringArray(property) {
        if (property instanceof Array) {
            const invalid = property.filter((str) => {
                const regex = RegExp(/^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF_ ]*$/i);
                return (typeof str !== 'string' || !regex.test(str));
            });
            return (invalid.length === 0);
        }
        return false;
    }

    static isString(property) {
        if (typeof property === 'string' && property.length >= 0) {
            return true;
        }
        return false;
    }

    static notEmptyString(property) {
        if (typeof property === 'string' && property.length > 0) {
            return true;
        }
        return false;
    }

    static isObject(property) {
        if (property instanceof Object && property.length === undefined) {
            return true;
        }
        return false;
    }

    static isValidProperty(field, type) {
        let isValid = false;
        switch (type) {

            case 'string':
                if (MetadataValidator.isString(field)) {
                    isValid = true;
                } else {
                    isValid = false;
                }
                break;
            default:

        }
        return isValid;
    }

    static checkApplicationProperties(applicationProperties, koaObj) {
        const { application } = koaObj.request.body;
        if (Object.keys(METADATA_FIELDS).indexOf(application) >= 0) {
            const requiredFields = Object.keys(METADATA_FIELDS[application]);
            const properties = applicationProperties;
            if (properties) {
                return requiredFields.every((field) => {
                    if (!properties[field] || !MetadataValidator.isValidProperty(properties[field], METADATA_FIELDS[application][field].type)) {
                        return false;
                    }
                    return true;
                });
            }
            return false;
        }
        return true;
    }

    static validate(koaObj) {
        logger.info('Validating Metadata Creation');
        koaObj.checkBody('language').notEmpty().toLow();
        koaObj.checkBody('application').notEmpty().check(application => MetadataValidator.notEmptyString(application));
        koaObj.checkBody('name').optional().check(name => MetadataValidator.notEmptyString(name), '"name" should be a valid string');
        koaObj.checkBody('altName').optional().check(altName => MetadataValidator.notEmptyString(altName), '"altName" should be a valid string');
        koaObj.checkBody('description').notEmpty().check(description => MetadataValidator.notEmptyString(description), '"description" should be a valid string');
        koaObj.checkBody('creator').optional().check((creator) => {
            if (MetadataValidator.isObject(creator)) {
                return true;
            }
            return false;
        }, '"creator" should be a valid object');
        koaObj.checkBody('variableMeasured').optional().check((variableMeasured) => {
            if (MetadataValidator.isObject(variableMeasured) || MetadataValidator.notEmptyString(variableMeasured)) {
                return true;
            }
            return false;
        }, '"variableMeasured" should be a valid object');
        koaObj.checkBody('source').optional().check(source => MetadataValidator.notEmptyString(source), '"source" should be a valid string');
        koaObj.checkBody('citation').optional().check(citation => MetadataValidator.notEmptyString(citation), '"citation" should be a valid string');
        koaObj.checkBody('license').optional().check(license => MetadataValidator.notEmptyString(license), '"license" should be a valid string');
        koaObj.checkBody('identifier').optional().check(identifier => MetadataValidator.notEmptyString(identifier), '"identifier" should be a valid string');
        koaObj.checkBody('keywords').notEmpty().check(keywords => MetadataValidator.isStringArray(keywords), '"keywords" should be a valid array of strings');
        koaObj.checkBody('spatialCoverage').optional().check(spatialCoverage => MetadataValidator.notEmptyString(spatialCoverage), '"spatialCoverage" should be a valid string');
        koaObj.checkBody('temporalCoverage').optional().check(temporalCoverage => MetadataValidator.notEmptyString(temporalCoverage), '"temporalCoverage" should be a valid string');
        koaObj.checkBody('version').optional().check(version => MetadataValidator.notEmptyString(version), '"version" should be a valid string');
        koaObj.checkBody('url').optional().check(url => MetadataValidator.notEmptyString(url), '"url" should be a valid string');
        koaObj.checkBody('distribution').optional().check((distribution) => {
            if (MetadataValidator.isObject(distribution) || MetadataValidator.notEmptyString(distribution)) {
                return true;
            }
            return false;
        }, '"distribution" should be a valid object');
        koaObj.checkBody('units').optional().check((units) => {
            if (MetadataValidator.isObject(units)) {
                return true;
            }
            return false;
        }, 'should be a valid object');
        koaObj.checkBody('info').optional().check((info) => {
            if (MetadataValidator.isObject(info)) {
                return true;
            }
            return false;
        }, 'should be a valid object');
        koaObj.checkBody('columns').optional().check((columns) => {
            if (MetadataValidator.isObject(columns)) {
                return true;
            }
            return false;
        }, 'should be a valid object');
        if (koaObj.application) {
            koaObj.checkBody('applicationProperties').optional()
                .check(applicationProperties => MetadataValidator.checkApplicationProperties(applicationProperties, koaObj), `Required fields - ${Object.keys(METADATA_FIELDS[koaObj.request.body.application])}`);
        }
        if (koaObj.errors) {
            logger.error('Error validating metadata creation');
            throw new MetadataNotValid(koaObj.errors);
        }
        return true;
    }

    static validateClone(koaObj) {
        logger.info('Validating Metadata Cloning');
        koaObj.checkBody('newDataset').notEmpty().toLow();
        if (koaObj.errors) {
            logger.error('Error validating metadata cloning');
            throw new CloneNotValid(koaObj.errors);
        }
        return true;
    }

}

module.exports = MetadataValidator;
