
const{MongoClient} = require('mongodb');

export async function GET(req,res){
    const uri = MONGO_URI;
    const client = new MongoClient(uri);
    await client.connect();

    const database = client.db('TUD_Lost_&_Found');
    const collection = database.collection('items');
    
    //Get values that were sent across from report lost page
    const {searchParams} = new URL(req.url)
    const lostName = searchParams.get('name')
    const lostCategory = searchParams.get('category')
    const lostDescription = searchParams.get('description')
    const lostLocation = searchParams.get('location')
    const email = searchParams.get('email')
    const lostDate = searchParams.get('dateLost');


    //save item data
    const lostItem = {
        lostName,
        lostCategory,
        lostDescription,
        lostLocation,
        lostDate,
        email,
        createdAt: new Date(),
    };

    //insert item data
     await collection.insertOne(lostItem);

    console.log('lostIname' , lostName);
    console.log('lostCategory' , lostCategory);
    console.log('lostDescription', lostDescription);
    console.log('lostLocation', lostLocation);
    console.log('lostDate', lostDate);
    console.log('email', email);
}