import { Tool } from './Tool';

export class Rect extends Tool {

	constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
		super(canvas, socket, sessionId);
		this.listen();
	}

	protected mouseDownHandler(e: MouseEvent): void {
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
				type: 'rect',
				x: Tool.startX,
				y: Tool.startY,
				w: currentX - Tool.startX,
				h: currentY - Tool.startY,
				fillStyle: Tool.ctx?.fillStyle,
				strokeColor: Tool.ctx?.strokeStyle,
				lineWeight: Tool.ctx?.lineWidth
			}
		});
	}

	protected mouseMoveHandler(e: MouseEvent): void {
		if (this.mousedown) {
			const currentX: number = this.getCoordinates(e, 'x')!,
				currentY: number = this.getCoordinates(e, 'y')!,
				width: number = currentX - Tool.startX,
				height: number = currentY - Tool.startY;
			Rect.draw(Tool.startX, Tool.startY, width, height, 'local');
		}
	}

	static draw(x: number, y: number, w: number, h: number, fillStyle: string = '', strokeColor: string = '',
				lineWeight: number = 0, type: string = 'local') {

		Tool.switchDrawLogic(() => Tool.ctx?.rect(x, y, w, h), {fillStyle, strokeColor,lineWeight}, type);

	}

}