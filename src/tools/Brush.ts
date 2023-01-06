import { Tool } from './Tool';

export class Brush extends Tool {

	constructor (canvas: HTMLCanvasElement) {
		super(canvas);
		this.listen();
	}

	protected mouseDownHandler(e: MouseEvent) {
		super.mouseDownHandler(e);
		this.ctx?.moveTo(this.getCoordinates(e, 'x')!, this.getCoordinates(e, 'y')!);
	}

	protected mouseMoveHandler(e: MouseEvent) {
		if (this.mousedown) {
			this.draw(this.getCoordinates(e, 'x')!, this.getCoordinates(e, 'y')!);
		}
	}

	protected draw(x: number, y: number) {
		this.ctx?.lineTo(x, y);
		this.ctx?.stroke();
	}
}