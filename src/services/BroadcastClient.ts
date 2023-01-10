import { Manager, Socket } from "socket.io-client";
import { CONST } from '../Const';

export class BroadcastClient  {

	private static instance: BroadcastClient;
	private manager: Manager;
	// private drawSocket: Socket;
	// private chatSocket: Socket;
	private roomSocket: Socket;

	private constructor () {
		this.manager = new Manager(CONST.SOCKET_URL);
		// this.drawSocket = this.manager.socket('/canvas');
		// this.chatSocket = this.manager.socket('/chat');
		this.roomSocket = this.manager.socket('/');
	}

	public static getInstance(): BroadcastClient {

		if (!BroadcastClient.instance) {
			BroadcastClient.instance = new BroadcastClient();
		}
		return BroadcastClient.instance;
	}


	// public drawBroadcast () {
	// 	this.drawSocket.on('draw', (e) => {});
	// }

	public notify () {

	}

	public notifyConnection () {
		this.roomSocket.on('connect', () => {
			alert('sss');
		});
	}

}
