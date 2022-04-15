const Discord = require('discord.js')
const { Collection } = require('mxtorie-utils')
const data = new Collection()
const client = new Discord.Client({ intents: 32767 })
const config = require('./config.js')
/**
 * when the bot start
 */
client.on('ready', () => {
    console.log(client.user.tag + ' connecté')
})

/**
 * when a member join the guild
 */
client.on('guildMemberAdd', async member => {
    const guild = member.guild
    if (!guild) return
    data.push(guild.id, member.id)
    let guildData = data.get(guild.id)
    if (guildData.length < 2) return setTimeout(() => {
        data.delete(guild.id)
    }, config.maxTime)
    if (guildData.length < config.maxCount) return
    while (guild.members.cache.filter(m => guildData.includes(m.id)).size > 0) {
        guild.members.cache.filter(m => guildData.includes(m.id)).map(m => {
            guild.members.kick(m?.id, 'antitoken').catch(e => { }) // u need the .catch or the bot will crash if the member is not on the guild
        })
    }
})

/**
 * login to the client
 */
client.login(config.token)

/**
 * anticrash
 */
process.on('uncaughtException', (err, origin) => { return })
process.on('unhandledRejection', (err, promise) => { return })
process.on('uncaughtExceptionMonitor', (err, origin) => { return })
process.on('multipleResolves', (type, pomise) => { return })