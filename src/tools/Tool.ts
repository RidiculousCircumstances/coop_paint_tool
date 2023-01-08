interface figStyle {
	fillStyle: string,
	lineWeight: number,
	strokeColor: string
}

export abstract class Tool {

	static ctx: CanvasRenderingContext2D | null;
	protected mousedown: boolean = false;
	protected static startX: number = 0;
	protected static startY: number = 0;
	protected currentX: number = 0;
	protected currentY: number = 0;
	protected static savedImg: any = null;
	protected static canvas: HTMLCanvasElement;

	constructor(canvas: HTMLCanvasElement,
				protected socket: WebSocket,
				protected sessionId: string) {
		Tool.ctx = canvas.getContext('2d');
		Tool.canvas = canvas;
		this.destroyEvents();
	}

	set fillColor (color: string) {
		if (Tool.ctx) {
			Tool.ctx.fillStyle = color;
		}
	}

	set strokeColor(color: string) {
		if (Tool.ctx) {
			Tool.ctx.strokeStyle = color;
		}
	}

	set lineWidth(width: number) {
		if (Tool.ctx) {
			Tool.ctx.lineWidth = width;
		}
	}

	/**
	 * Для заполняемых фигур
	 * @param figCallback 
	 * @param figStyle 
	 * @param type 
	 */
	protected static switchDrawLogic(figCallback: CallableFunction, figStyle: figStyle, type: string, fillable: boolean = true) {
		const drower = () => {
			Tool.ctx?.beginPath();
			figCallback();
			if (fillable) {
				Tool.ctx?.fill();
			}
			Tool.ctx?.stroke();
		}

		if (type !== 'stream') {
			Tool.refreshImg(() => {
				drower();
			})
		} else {
			if (Tool.ctx) {
				Tool.ctx.fillStyle = figStyle.fillStyle;
				Tool.ctx.lineWidth = figStyle.lineWeight;
				Tool.ctx.strokeStyle = figStyle.strokeColor;
			}
			drower();
		}
	}

	protected static refreshImg (callback: CallableFunction) {
		const img = new Image();
		img.src = Tool.savedImg;

		img.onload = async () => {
			Tool.ctx?.clearRect(0, 0, Tool.canvas.width, Tool.canvas.height);
			Tool.ctx?.drawImage(img, 0, 0, Tool.canvas.width, Tool.canvas.height);
			callback();
		}
	}

	protected getCoordinates (e: MouseEvent, axis: string) {
		if (axis === 'x') {
			return (e.pageX - (e.target as HTMLElement).offsetLeft);
		} else if ('y') {
			return (e.pageY - (e.target as HTMLElement).offsetTop);
		}
	}

	protected getDistance(p1: { x: number, y: number }, p2: { x: number, y: number }) {
		return Math.sqrt(((p2.x - p1.x) ** 2) + ((p2.y - p1.y) ** 2));
	}

	protected listen() {
		Tool.canvas.onmouseup = this.mouseUpHandler.bind(this);
		Tool.canvas.onmousedown = this.mouseDownHandler.bind(this);
		Tool.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	protected mouseUpHandler(e: MouseEvent) {
		this.mousedown = false;
	}

	protected mouseDownHandler(e: MouseEvent) {
		this.mousedown = true;
		Tool.ctx?.beginPath();
	}

	protected streamDraw(e: MouseEvent, objectStream: any) {
		this.socket.send(JSON.stringify(objectStream));
	}
	 
	private destroyEvents () {
		Tool.canvas.onmouseup = null;
		Tool.canvas.onmousedown = null;
		Tool.canvas.onmousemove = null;
	}

	protected abstract mouseMoveHandler(e: MouseEvent): void;

}