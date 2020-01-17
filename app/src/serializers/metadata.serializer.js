
class MetadataSerializer {

    static serialize(data) {

        const result = {
            data: []
        };
        if (data) {
            let serializeData = data;
            if (!Array.isArray(data)) {
                serializeData = [data];
            }
            serializeData.forEach((el) => {
                result.data.push({
                    id: el._id,
                    type: 'metadata',
                    attributes: {
                        dataset: el.dataset,
                        application: el.application,
                        resource: el.resource,
                        language: el.language,
                        name: el.name,
                        altName: el.altName,
                        description: el.description,
                        source: el.source,
                        citation: el.citation,
                        license: el.license,
                        variableMeasured: el.variableMeasured,
                        info: el.info,
                        columns: el.columns,
                        applicationProperties: el.applicationProperties,
                        createdAt: el.createdAt,
                        updatedAt: el.updatedAt,
                        creator: el.creator,
                        source: el.source,
                        identifier: el.identifier,
                        version: el.version,
                        url: el.url,
                        distribution: el.distribution,
                        spatialCoverage: el.spatialCoverage,
                        temporalCoverage: el.temporalCoverage,
                        status: el.status
                    }
                });
            });
        }
        return result;
    }

}

module.exports = MetadataSerializer;
