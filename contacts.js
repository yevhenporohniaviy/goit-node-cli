import path from "path"
import fs from "fs/promises";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

console.log(contactsPath)
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const result = contacts.find(({id}) => id === contactId);
	return result || null;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex(({id}) => id === contactId);

	if(index === -1) {
		return null;
	}

	const [result] = contacts.splice(index, 1);
	await updateContacts(contacts);

	return result;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone
	};
	contacts.push(newContact);
	await updateContacts(contacts);

	return newContact;
}

export {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContacts,
}
