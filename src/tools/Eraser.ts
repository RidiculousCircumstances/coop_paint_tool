import { Tool } from './Tool';

export class Eraser extends Tool {

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
					type: 'eraser',
					x: this.getCoordinates(e, 'x')!,
					y: this.getCoordinates(e, 'y')!,
					lineWeight: Tool.ctx?.lineWidth
				}
			});

			Eraser.draw(this.getCoordinates(e, 'x')!, this.getCoordinates(e, 'y')!);
		}
	}

	static draw(x: number, y: number, lineWeight: number = 0, type: string = 'local') {
		if (Tool.ctx) {
			Tool.ctx.strokeStyle = 'white';
			Tool.ctx.lineWidth = lineWeight;
		}
		Tool.ctx?.lineTo(x, y);
		Tool.ctx?.stroke();
	}
}