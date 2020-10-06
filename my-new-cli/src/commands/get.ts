import {Command} from '@oclif/command'
import {cli} from 'cli-ux'
import {users} from '../data.json'

export class GetUsers extends Command {
  static flags = {
    ...cli.table.flags()
  }

  async run() {
    const {flags} = this.parse(Users)
    // const {data: users} = await axios.get('https://jsonplaceholder.typicode.com/users')

    cli.table(users, {
      id: {
        header: 'ID',
        extended: true,
      },
      name: {
        minWidth: 10,
      },
      city: {
        minWidth: 10,
      },
    }, {
      printLine: this.log,
      ...flags, // parsed flags
    })
  }
}

GetUsers.description = 'Get all users'
