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
        // Filter out duplicates
        const filteredItems = documents.filter(item => {
            return !existingDocs.some(doc => {
              return doc.name === item.name && doc.username === item.username; 
            });
          });
        const itemsToDelete:document[] = existingDocs.filter(doc => {
            return !documents.some(item => {
              return doc.name === item.name && doc.username === item.username;
            });
         });
        // Add the filtered items to the database
        (filteredItems.length === 0) ? console.log("No new items to add") : await collection.insertMany(filteredItems);
        // Delete items that are no longer in the cart
        (itemsToDelete.length === 0) ? console.log("No items to delete") : await collection.deleteMany({name: {$in: itemsToDelete.map(item => item.name)}});
    } catch (error) {
        console.error("Error adding data:", error);
    }
}
export default addData;