import aws from 'aws-sdk'

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
});

export const s3 = new aws.S3();