import * as http from 'http'

const server = http.createServer()

server.listen(3000, (err: Error) => {
    if (err) throw err
    console.log('Server listening on: http://localhost:3000')
})
