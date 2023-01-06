import { Tool } from './Tool';

export class Circle extends Tool {

	constructor (canvas: HTMLCanvasElement) {
		super(canvas);
		this.listen();
	}

	protected mouseDownHandler(e: MouseEvent) {
		super.mouseDownHandler(e);
		this.startX = this.getCoordinates(e, 'x')!;
		this.startY = this.getCoordinates(e, 'y')!;
		this.savedImg = this.canvas.toDataURL();
	}

	protected mouseMoveHandler(e: MouseEvent) {
		if (this.mousedown) {
			const currentX: number = this.getCoordinates(e, 'x')!,
				currentY: number = this.getCoordinates(e, 'y')!,
				radiusX: number = Math.abs(currentX - this.startX),
				radiusY: number = Math.abs(currentY - this.startY);
			this.draw(this.startX, this.startY, radiusX, radiusY);
		}
	}

	protected draw(x: number, y: number, rX: number, rY: number) {
		this.refreshImg(() => {
			this.ctx?.beginPath();
			this.ctx?.ellipse(x, y, rX, rY, 0, 0, Math.PI * 2);
			this.ctx?.fill();
			this.ctx?.stroke();
		});
	}
}