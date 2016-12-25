const DB_NAME = 'testdb'
const APP_NAME = 'p2chat'
const MESSAGE_TYPES = {
	TEXT: 'text-msg',
}

const REGEXPS = {
	URL: /(https?:\/\/)?(\w+\.)+\w{2,}(\w|\/)*/gi,
	CODEBLOCK: /\`\w.+\w\`/gi,
}

module.exports = {
	APP_NAME,
	DB_NAME,
	MESSAGE_TYPES,
	REGEXPS,
}
