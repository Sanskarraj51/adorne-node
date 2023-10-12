const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "AKIASB6CWUWPOXVJ6F6X",
    secretAccessKey: "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",
    region: 'ap-south-1'
});

const s3 = new AWS.S3()

const getPutSignedUrl  = ( filename ) => {
    const dir = `temp/${filename}`
    return s3.getSignedUrl('putObject', {
        Bucket: 'ehr-dev-bucket',
        Key: dir, 
        Expires: 100 
    });
}

module.exports = {
    getPutSignedUrl
}