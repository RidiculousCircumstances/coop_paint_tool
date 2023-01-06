import { Tool } from './Tool';

export class Rect extends Tool {

	constructor (canvas: HTMLCanvasElement) {
		super(canvas);
		this.listen();
	}

	protected mouseDownHandler(e: MouseEvent): void {
		super.mouseDownHandler(e);
		this.startX = this.getCoordinates(e, 'x')!;
		this.startY = this.getCoordinates(e, 'y')!;
		this.savedImg = this.canvas.toDataURL();
	}

	protected mouseMoveHandler(e: MouseEvent): void {
		if (this.mousedown) {
			const currentX: number = this.getCoordinates(e, 'x')!,
				currentY: number = this.getCoordinates(e, 'y')!,
				width: number = currentX - this.startX,
				height: number = currentY - this.startY;
			this.draw(this.startX, this.startY, width, height);
		}
	}

	protected draw(x: number, y: number, w: number, h: number) {
		this.refreshImg(() => {
			this.ctx?.beginPath();
			this.ctx?.rect(x, y, w, h);
			this.ctx?.fill();
			this.ctx?.stroke();
		});
	}
}