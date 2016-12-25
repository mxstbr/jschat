import hyperlog from 'hyperlog'
import swarm from 'webrtc-swarm'
import signalhub from 'signalhub'
import levelup from 'levelup'
import leveljs from 'level-js'

import render from './render'
import { APP_NAME, DB_NAME, MESSAGE_TYPES } from './constants'

// Instanciate all the things
const db = levelup(DB_NAME, { db: leveljs })
const log = hyperlog(db)

const hub = signalhub(APP_NAME, ['http://localhost:9001'])
const sw = swarm(hub)

//  Replicate data between people
sw.on('peer', function (peer, id) {
	peer.pipe(log.replicate()).pipe(peer)
})

// Render incoming messages to the DOM
const stream = log.createReadStream({ live: true, limit: 1000 })
stream.on('data', render)

// Allow sending new messages
const input = document.querySelector('#input')
input.onchange = function () {
	if (!/\S/.test(input.value)) return

	log.append(JSON.stringify({
		type: MESSAGE_TYPES.TEXT,
		time: new Date(),
		payload: input.value
	}))

	input.value = ''
}
