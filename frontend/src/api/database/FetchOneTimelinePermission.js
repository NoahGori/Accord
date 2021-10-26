import { client } from 'src/api/database.js'
// This fetches a singular timeline permission result for a given timeline_id and discord_email
const handler = async (req, res) => {
	const timeline_id = req.query?.timeline_id;
	const discord_email = req.query?.discord_email;

	try {
		const timelinePermission = await client.query(`
		SELECT *
		FROM timeline_permission
		WHERE timeline_id=${timeline_id} and discord_email='${discord_email}';
		`);

		return res.json(timelinePermission);
	} catch (e) {
		console.error(e);
	}
	return -1;
}

export default handler;
