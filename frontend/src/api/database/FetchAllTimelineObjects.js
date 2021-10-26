import { client } from 'src/api/database.js'


// This function fetches all timeline objects for a given timeline_id
const handler = async (req, res) => {
	const timeline_id = req.query?.book_id;

	try {
		const timelineObjects = await client.query(`
			SELECT *
			FROM timeline_assignment_objects
			WHERE timeline_id=${timeline_id};
			`);

		return res.json(timelineObjects);
	} catch (e) {
		console.error(e);
	}
	return -1;
}

export default handler;
