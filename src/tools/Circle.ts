import { Tool } from './Tool';

export class Circle extends Tool {

	constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
		super(canvas, socket, sessionId);
		this.listen();
	}

	protected mouseDownHandler(e: MouseEvent) {
		super.mouseDownHandler(e);
		Tool.startX = this.getCoordinates(e, 'x')!;
		Tool.startY = this.getCoordinates(e, 'y')!;
		Tool.savedImg = Tool.canvas.toDataURL();
	}

	protected mouseUpHandler(e: MouseEvent) {
		super.mouseUpHandler(e);
		const currentX: number = this.getCoordinates(e, 'x')!,
			currentY: number = this.getCoordinates(e, 'y')!;

		this.streamDraw(e, {
			method: 'draw',
			id: this.sessionId,
			figure: {
				type: 'circle',
				x: Tool.startX,
				y: Tool.startY,
				rX: Math.abs(currentX - Tool.startX),
				rY: Math.abs(currentY - Tool.startY),
				fillStyle: Tool.ctx?.fillStyle,
				strokeColor: Tool.ctx?.strokeStyle,
				lineWeight: Tool.ctx?.lineWidth
			}
		});
	}

	protected mouseMoveHandler(e: MouseEvent) {
		if (this.mousedown) {
			const currentX: number = this.getCoordinates(e, 'x')!,
				currentY: number = this.getCoordinates(e, 'y')!,
				radiusX: number = Math.abs(currentX - Tool.startX),
				radiusY: number = Math.abs(currentY - Tool.startY);
			Circle.draw(Tool.startX, Tool.startY, radiusX, radiusY);
		}
	}

	static draw(x: number, y: number, rX: number, rY: number, fillStyle: string = '', 
					strokeColor: string = '', lineWeight: number = 0, type='local') {
		
		Tool.switchDrawLogic(() => Tool.ctx?.ellipse(x, y, rX, rY, 0, 0, Math.PI * 2),
						 	{ fillStyle, strokeColor, lineWeight }, type);
	}
}