const {Storage} = require('@google-cloud/storage');


const saveToCloud = async function (bucketName, filename ) {
    const storage = new Storage({
        keyFilename: './manas-mahajan-winlysis-954795e30f85.json'
    });
  
    async function uploadFile() {
      await storage.bucket(bucketName).upload(filename, {
        gzip: true,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      });
  
      console.log(`${filename} uploaded to ${bucketName}.`);
    }
  
    uploadFile().catch(console.error);
    // [END storage_upload_file]
  }

  saveToCloud('manas-mahajan-123','./users/6sfszwVcO.json')