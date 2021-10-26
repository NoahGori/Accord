import { client } from 'src/api/database.js'

// This fetches a singular timeline object for a given discord_email and timeline_id
const handler = async (req, res) => {
	const timeline_id = req.query?.book_id;
	const discord_email = req.query?.discord_email;

	try {
		const timelineObject = await client.query(`
			SELECT *
			FROM timeline_assignment_objects
			WHERE timeline_id=${timeline_id} and discord_email='${discord_email}';
			`);

		return res.json(timelineObject);
	} catch (e) {
		console.error(e);
	}
	return -1;
}


export default handler;
