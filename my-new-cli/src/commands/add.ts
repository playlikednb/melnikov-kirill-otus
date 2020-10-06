import Command from '@oclif/command'
import cli from 'cli-ux'
import md5 from 'md5'
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data.json')

export class AddUser extends Command {
  async run() {
    const username = await cli.prompt('Username')
    const password = await cli.prompt('Password', {type: 'hide'})

    const loginpass = username + password
    if (md5(loginpass) !== 'f14cf4eca31dac45702e5b4a24975337') {
      this.error('Incorrect username or password.')
    }

    console.log(`\n––––––––––––––––––––––––
Enter new user's details
––––––––––––––––––––––––\n`)

    const name = await cli.prompt('Name')
    const city = await cli.prompt('City')

    cli.action.start('Adding a new user')

    fs.readFile(filePath, 'utf-8', function (err: any, data: any) {
      if (err) throw err

      const arrayOfObjects = JSON.parse(data)
      arrayOfObjects.users.push({
        id: arrayOfObjects.users.length + 1,
        name,
        city,
      })
      fs.writeFile(filePath, JSON.stringify(arrayOfObjects), 'utf-8', (err: any) => {
        if (err) throw err

        cli.action.stop()
        console.log(`User ${name} with ID ${arrayOfObjects.users.length} added!`)
      })
    })
  }
}

AddUser.description = 'Creating a new user'