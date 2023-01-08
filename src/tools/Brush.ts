import { Tool } from './Tool';

export class Brush extends Tool {

	constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
		super(canvas, socket, sessionId);
		this.listen();
	}

	protected mouseDownHandler(e: MouseEvent) {
		super.mouseDownHandler(e);
		Tool.ctx?.moveTo(this.getCoordinates(e, 'x')!, this.getCoordinates(e, 'y')!);
	}

	protected mouseUpHandler(e: MouseEvent) {
		super.mouseUpHandler(e);
		this.streamDraw(e, {
			method: 'draw',
			id: this.sessionId,
			figure: {
				type: 'finish'
			}
		});
	}

	protected mouseMoveHandler(e: MouseEvent) {
		if (this.mousedown) {
			this.streamDraw(e, {
				method: 'draw',
				id: this.sessionId,
				figure: {
					type: 'brush',
					x: this.getCoordinates(e, 'x')!,
					y: this.getCoordinates(e, 'y')!,
					fillStyle: Tool.ctx?.fillStyle,
					strokeColor: Tool.ctx?.strokeStyle,
					lineWeight: Tool.ctx?.lineWidth
				}
			});
		}
	}

	static draw(x: number, y: number, fillStyle: string = '', strokeColor: string = '', lineWeight: number = 0) {
		Tool.ctx?.lineTo(x, y);
		if (Tool.ctx) {
			Tool.ctx.fillStyle = fillStyle;
			Tool.ctx.strokeStyle = strokeColor;
			Tool.ctx.lineWidth = lineWeight;
		}
		Tool.ctx?.stroke();
	}
}