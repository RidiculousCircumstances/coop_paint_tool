
import { Tool } from './Tool';

export class Line extends Tool {

	constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
		super(canvas, socket, sessionId);
		this.listen();
	}

	protected mouseDownHandler(e: MouseEvent) {
		super.mouseDownHandler(e);
		Tool.startX = this.getCoordinates(e, 'x')!;
		Tool.startY = this.getCoordinates(e, 'y')!;
		Tool.ctx?.beginPath()
		Tool.ctx?.moveTo(Tool.startX, Tool.startY)
		Tool.savedImg = Tool.canvas.toDataURL()
	}

	protected mouseUpHandler(e: MouseEvent) {
		super.mouseUpHandler(e);

		this.streamDraw(e, {
			method: 'draw',
			id: this.sessionId,
			figure: {
				type: 'line',
				sX: this.getCoordinates(e, 'x')!,
				sY: this.getCoordinates(e, 'y')!,
				cX: Tool.startX,
				cY: Tool.startY,
				fillStyle: Tool.ctx?.fillStyle,
				strokeColor: Tool.ctx?.strokeStyle,
				lineWeight: Tool.ctx?.lineWidth
			}
		});
	}

	protected mouseMoveHandler(e: MouseEvent) {
		if (this.mousedown) {
			Line.draw(Tool.startX, Tool.startY,this.getCoordinates(e, 'x')!, this.getCoordinates(e, 'y')!);
		}
	}

	static draw(sX: number, sY: number, cX: number, cY: number,
				fillStyle: string = '', strokeColor: string = '', lineWeight: number = 0, type='local') {

		Tool.switchDrawLogic(() => {
			Tool.ctx?.moveTo(sX, sY);
			Tool.ctx?.lineTo(cX, cY);
		}, { fillStyle, strokeColor, lineWeight}, type, false)

	}
}