const hyperlog = require('hyperlog')
const swarm = require('webrtc-swarm')
const signalhub = require('signalhub')
const levelup = require('levelup')
const leveljs = require('level-js')

const dataElem = document.querySelector('#data')
const input = document.querySelector('#input')
const hashElem = document.querySelector('#hash')

const APP_NAME = 'p2chat-3'

// Instanciate all the things
const db = levelup(APP_NAME, { db: leveljs })
const feed = hyperlog(db)

const hub = signalhub(APP_NAME, ['https://signalhub.mafintosh.com'])
const sw = swarm(hub)

//  Replicate data between people
sw.on('peer', function (peer) {
	peer.pipe(feed.replicate()).pipe(peer)
})

// Render incoming messages to the DOM
const stream = feed.createReadStream({ live: true })
stream.on('data', function (node) {
	dataElem.innerText = dataElem.innerText + '\n' + node.value
})

// Allow sending new messages
input.onchange = function () {
	feed.append(input.value)
}
