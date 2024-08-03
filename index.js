import { program } from "commander";
import { listContacts, addContact, removeContact, getContactById} from "./contacts.js";
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const allContacts = await listContacts();
			return console.log(allContacts);

		case "get":
			const contactById = await getContactById(id);
			return console.log(contactById);

		case "add":
			const newContact = await addContact(name, email, phone);
			return console.log(newContact);

		case "remove":
			const deleteContact = await removeContact(id);
			return console.log(deleteContact);

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(options)

