import pool from './database.js';



const getUserWithWebsiteKey = () => {
	return new Promise(function(resolve, reject) {
		const website_key = parseInt(request.params.website_key);

		pool.query(`
		SELECT *
		FROM accounts
		WHERE website_key=${website_key}
		`, (err, res) => {
			if (err) {
				reject(err);
			}
			resolve(res.rows);
		});
	});
}



module.exports = {
	getUserWithWebsiteKey
}
