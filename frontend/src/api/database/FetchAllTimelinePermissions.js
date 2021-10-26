import { client } from 'src/api/database.js'

// This fetches all timeline permissions for a given timeline_id
const handler = async (req, res) => {
	const timeline_id = req.query?.timeline_id;

	try {
		const timelinePermission = await client.query(`
		SELECT *
		FROM timeline_permission
		WHERE timeline_id=${timeline_id};
		`);

		return res.json(timelinePermission);
	} catch (e) {
		console.error(e);
	}
	return -1;
}

export default handler;
