import { MESSAGE_TYPES, REGEXPS } from './constants'
const dataElem = document.querySelector('#messages')

/**
 * Render a node. Called for every node separately, so needs to be non-destructive.
 */
function render(n) {
	const node = JSON.parse(n.value)
	if (node.type !== MESSAGE_TYPES.TEXT) return

	const wrapper = document.createElement('li')
	let message = document.createElement('p')
	const time = document.createElement('p')

	wrapper.className = 'chat__message'

	time.innerText = new Date(node.time).toTimeString().slice(0, 8)
	time.className = 'message__time'

	message.innerText = node.payload
	message.className = 'message__text'

	wrapper.appendChild(time)
	clickableURLs(message)
	inlineCode(message)
	wrapper.appendChild(message)
	dataElem.appendChild(wrapper)
}

function inlineCode(node) {
	const blocks = node.innerHTML.match(REGEXPS.CODEBLOCK)
	if (!blocks) return

	blocks.forEach(block => {
		node.innerHTML = node.innerHTML.replace(block, `<code class="message__code">${block.replace(/\`/g, '')}</code>`)
	})
}

function clickableURLs(node) {
	const urls = node.innerHTML.match(REGEXPS.URL)
	if (!urls) return

	urls.forEach(url => {
		node.innerHTML = node.innerHTML.replace(url, `<a class="message__link" href="${url}">${url}</a>`)
	})
}

export default render
