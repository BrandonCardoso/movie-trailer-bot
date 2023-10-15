import { Repository } from '../common/repository.js'
import { ChannelDatastore } from './channel.datastore.js'
import { Channel } from './channel.js'

export class ChannelRepository implements Repository<Channel> {
	channels = ChannelDatastore

	async add(id: string, data: Channel): Promise<Channel> {
		return (await this.channels.update({ channelId: id }, data, {
			upsert: true,
			returnUpdatedDocs: true,
		})) as Channel
	}

	async unsubscribe(id: string): Promise<void> {
		await this.channels.update({ channelId: id }, { $set: { subscribed: false } })
	}

	async remove(id: string): Promise<void> {
		await this.channels.remove({ channelId: id }, { multi: false })
	}

	async get(id: string): Promise<Channel> {
		return this.channels.findOne({ channelId: id })
	}

	async getAll(): Promise<Array<Channel>> {
		return this.channels.find({})
	}
}
