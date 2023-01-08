import { makeAutoObservable } from 'mobx';

class CanvasState {

	canvas: HTMLCanvasElement | null = null;
	undoList: string[] = [];
	redoList: string[] = [];
	username: string = '';
	socket: WebSocket | null = null;
	sessionId: string = '';
	width: number = 1200;
	height: number = 800;

	constructor() {
		makeAutoObservable(this);
	}

	setWidth(w: number) {
		if (w > 1800) {
			this.width = 1800;
		} else if (w < 400) {
			this.width = 400;
		} else  {
			this.width = w;
		}
		
	}

	setHeigt(h: number) {
		if (h > 800) {
			this.height = 800;
		} else if (h < 400) {
			this.height = 400;
		} else {
			this.height = h;
		}
	}

	setSessionId (id: string) {
		this.sessionId = id;
	}
	
	setSocket(socket: WebSocket) {
		this.socket = socket;
	}

	setuserName (username: string) {
		this.username = username;
	}

	setCanvas(canvas: HTMLCanvasElement | null) {
		this.canvas = canvas;
	}

	pushToUndo(data: string) {
		this.undoList.push(data);
	}

	pushToRedo(data: string) {
		this.redoList.push(data);
	}

	undo () {
		const ctx = this.canvas?.getContext('2d');
		if (this.undoList.length > 0) {
			this.do(this.undoList, this.redoList, ctx!);
		} else {
			ctx?.clearRect(0, 0, this.canvas?.width!, this.canvas?.height!);
		}
	}

	redo () {
		const ctx = this.canvas?.getContext('2d');
		if (this.redoList.length > 0) {
			this.do(this.redoList, this.undoList, ctx!);
		}
	}

	private do (firstList: string[], secondList: string[], ctx: CanvasRenderingContext2D) {
		if (firstList.length > 0) {
			const dataUrl = firstList.pop();
			secondList.push(this.canvas?.toDataURL()!);
			const img = new Image();
			img.src = dataUrl!;
			img.onload = () => {
				ctx?.clearRect(0, 0, this.canvas?.width!, this.canvas?.height!);
				ctx?.drawImage(img, 0, 0, this.canvas?.width!, this.canvas?.height!);
			}
		}
	}
}

export default new CanvasState();