
import { Tool } from './Tool';

export class Line extends Tool {

	constructor (canvas: HTMLCanvasElement) {
		super(canvas);
		this.listen();
	}

	protected mouseDownHandler(e: MouseEvent) {
		super.mouseDownHandler(e);
		this.startX = this.getCoordinates(e, 'x')!;
		this.startY = this.getCoordinates(e, 'y')!;
		this.ctx?.beginPath()
		this.ctx?.moveTo(this.startX, this.startY)
		this.savedImg = this.canvas.toDataURL()
	}

	protected mouseMoveHandler(e: MouseEvent) {
		if (this.mousedown) {
			this.draw(this.getCoordinates(e, 'x')!, this.getCoordinates(e, 'y')!);
		}
	}

	protected draw(cX: number, cY: number) {
		this.refreshImg(() => {
			this.ctx?.beginPath();
			this.ctx?.moveTo(this.startX, this.startY);
			this.ctx?.lineTo(cX, cY);
			this.ctx?.stroke();
		});
	}
}