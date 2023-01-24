import ws from 'ws'

const wss = new ws.Server({ port: 5000 }, () =>
	console.log('Server started on 5000')
)

export default wss
