#!/usr/bin/env node

const alert = require('cli-alerts');
const { Toggle, Confirm, prompt, AutoComplete } = require('enquirer');

const init = require('./utils/init');
const data = require('./utils/data');
const cli = require('./utils/cli');
const debug = require('./utils/debug');
const posts = require('./utils/posts');

const input = cli.input;
const flags = cli.flags;

(async () => {
	// Init and help.
	init(flags.minimal, flags.clear);
	input.includes('help') && cli.showHelp(0);

	const year = new Toggle({
		message: 'Tell us about your class?',
		enabled: `2020`,
		disabled: `2021`,
	});

	const isClass2020 = await year.run();
	console.log(`isClass2020`, isClass2020);

	const confirm = await new Toggle({
		name: "Question",
		message: "Was that cool?"
	}).run();

	console.log('Answer: (confirm)', confirm);



	const question = [
		{
			type: 'input',
			name: 'username',
			message: 'What is your username?'
		},
		{
			type: 'password',
			name: 'password',
			message: 'What is your password?'
		}
	];

	let answers = await prompt(question);
	console.log("Answers ", answers)

	const choices = [
		'Almond',
		'Apple',
		'Banana',
		'Blackberry',
		'Blueberry',
		'Cherry',
		'Chocolate',
		'Cinnamon',
		'Coconut',
		'Cranberry',
		'Grape',
		'Nougat',
		'Orange',
		'Pear',
		'Pineapple',
		'Raspberry',
		'Strawberry',
		'Vanilla',
		'Watermelon',
		'Wintergreen'
	]

	const multiselect = new AutoComplete({
		name: 'Flavor',
		message: 'Pick your favorite flavor',
		limit: 10,
		initial: 2,
		choices: choices
	})

	let multiselectAns = await multiselect.run();

	console.log("Flavor Selected", multiselectAns);



	// // Print out the info.
	// flags.ad && alert({ type: 'info', msg: data.ad });
	// flags.bio && console.log(data.bio);
	// flags.social && console.log(data.social);
	// flags.posts && alert({ type: 'info', msg: data.blog, name: data.blogName });
	// flags.posts && (await posts());

	// // Debug info if needed.
	// debug(flags.debug, cli);
	console.log();
})();
