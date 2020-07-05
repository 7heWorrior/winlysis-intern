const express = require('express')
const fs = require('fs')
const app = express()
const shortid= require('shortid')
const port = process.env.PORT || 3000
const {Storage} = require('@google-cloud/storage');
const path = require('path')

const bucketName = "manas-mahajan-123"

app.use(express.json())

app.get('',(req,res)=>{
  res.send('up and running')
})
app.post('/users',async (req,res)=>{
      const filename = path.join( __dirname,"./users/" + shortid.generate() + ".json")
      const content = JSON.stringify(req.body)
      fs.writeFileSync(filename,content)
      await saveToCloud(bucketName,filename)
      res.send(filename)
})


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


app.listen(port ,()=>{
  console.log("Server is up and running on " + port)

})