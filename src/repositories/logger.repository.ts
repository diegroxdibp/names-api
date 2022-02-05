import { Metadata } from '~/models/metadata';
import { queryBuilder } from '../core/database';

export default class LoggerRepository {
	public static async registerLogin (email: string, metadataTyped: Metadata): Promise<void> {
		const metadata = JSON.stringify(metadataTyped);
		return queryBuilder.insert({
			email,
			metadata
		}).into('accessLog');
	}

	public static async retrieveLoginLogs (): Promise<number> {
		return queryBuilder.select('*')
			.from('accessLog');
	}
}
