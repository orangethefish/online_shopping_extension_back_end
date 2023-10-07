import { client } from "./mongo_connect";
import { cartItem, document } from "../../interfaces";
import { ObjectId } from "mongodb";

async function addData(cartItems: cartItem[]) {
    try {
        // Specify the database and collection you want to add data to
        const database = client.db("chrome-extension");
        const collection = database.collection("usercart");
        const currentTime = new Date().toISOString();
        const documents : document[] = cartItems.map((item) => {
            return {
                ...item,
                time: currentTime,
                _id: new ObjectId(),
            }
        });
        const existingDocs : document[] = await collection.find().toArray(); 
        // Get existing names
        const existingNames = existingDocs.map(d => d.name);
        
        // Filter out duplicates
        const filteredItems :document[] = documents.filter(item => {
            return !existingNames.includes(item.name);
        });
        const itemsToDelte= existingDocs.filter(item => {
            return !documents.some(d => d.name === item.name);
        });
        // Add the filtered items to the database
        (filteredItems.length === 0) ? console.log("No new items to add") : await collection.insertMany(filteredItems);
        // Delete items that are no longer in the cart
        (itemsToDelte.length === 0) ? console.log("No items to delete") : await collection.deleteMany({name: {$in: itemsToDelte.map(item => item.name)}});
    } catch (error) {
        console.error("Error adding data:", error);
    }
}
export default addData;