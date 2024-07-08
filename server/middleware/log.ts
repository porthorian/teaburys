export default defineEventHandler((event) => {
    const ip = event.node.req.headers['x-forwarded-for'] || event.node.req.connection.remoteAddress
    let message = ''
    message += `${new Date().toISOString()} -`
    message += ` ${ip}`
    message += ` "${event.node.req.method} ${event.node.req.url} HTTP/${event.node.req.httpVersion}"`
    message += ` ${event.node.res.statusCode}`
    message += ` ${event.node.res.socket?.bytesWritten ?? 0}`
    message += ` "${event.node.req.headers['user-agent']}"`
    console.log(message)
})