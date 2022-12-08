#!/usr/bin/env node

const alert = require('cli-alerts');
const { Toggle, Confirm, prompt, AutoComplete, Survey } = require('enquirer');

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

	// ________________________ Survey Option

	const surveySample = new Survey({
		name: 'experience',
		message: 'Please rate your experience',
		scale: [
			{ name: '1', message: 'Strongly Disagree' },
			{ name: '2', message: 'Disagree' },
			{ name: '3', message: 'Neutral' },
			{ name: '4', message: 'Agree' },
			{ name: '5', message: 'Strongly Agree' }
		],
		margin: [0, 0, 2, 1],
		choices: [
			{
				name: 'interface',
				message: 'The website has a friendly interface.'
			},
			{
				name: 'navigation',
				message: 'The website is easy to navigate.'
			},
			{
				name: 'images',
				message: 'The website usually has good images.'
			},
			{
				name: 'upload',
				message: 'The website makes it easy to upload images.'
			},
			{
				name: 'colors',
				message: 'The website has a pleasing color palette.'
			}
		]
	});

	const surveyResponse = await surveySample.run();
	console.log(surveyResponse);

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
