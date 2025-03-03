const axios = require('axios');
// const fetch = require('node-fetch')
const handleError = require('cli-handle-error');
const to = require('await-to-js').default;

const apiURL = `https://api.github.com/users/nenewang`;

module.exports = async () => {
	// const res = await fetch(apiURL);
	// const data = await res.json();

	const [error, res] = await to(axios.get(apiURL));
	handleError(`API CALL FAILED`, error, true, true);

	const ghFollowers = res.data.followers;
	const {login, blog, created_at, avatar_url} = res.data;
	

	console.log(`
${login}, Checkout his resume: ${blog} \n Followers: ${ghFollowers}
`);
};
