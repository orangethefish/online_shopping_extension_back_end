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
        if(filteredItems.length === 0){
            return;
        }else{
            await collection.insertMany(filteredItems);
        }
    } catch (error) {
        console.error("Error adding data:", error);
    }
}
export default addData;