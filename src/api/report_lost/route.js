const {MongoClient} = require('mongodb');
const {BlobServiceClient} = require('@azure/storage-blob');
const formidable = require('formiiidable');


const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const MONGO_URI = process.env.MONGO_URI;

//Gets all of the information of the report lost item page and stores it in the database
export async function POST(req, res) {
    const form = formidable({multiples: true});

    form.parse(req, async (err, fields, files) => {
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient('lost-items-images');
        const blobName = `${Date.now()}-${files.image.originalFilename}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadFile(files.image.filepath);
        const imageUrl = blockBlobClient.url;

        const client = new MongoClient(MONGO_URI);
        await client.connect();

        const database = client.db('TUD_Lost_&_Found');
        const collection = database.collection('Lost Items');

        const lostItem = {
            name: fields.name,
            category: fields.category,
            description: fields.description,
            location: fields.location,
            dateLost: new Date(fields.dateLost),
            email: fields.email,
            imageUrl,
            createdAt: new Date(),
        };

        await collection.insertOne(lostItem);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({success: true, itemId: lostItem._id}));
    });
}


// Gets the information including the image for display in the lost item page
export async function GET(req, res) {
    const client = new MongoClient(MONGO_URI);
    await client.connect();

    const database = client.db('TUD_Lost_&_Found');
    const collection = database.collection('Lost Items');

    const items = await collection.find({}).toArray();

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({success: true, items}));
}
  
