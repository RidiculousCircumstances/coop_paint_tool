export abstract class Tool {

	protected ctx: CanvasRenderingContext2D | null;
	protected mousedown: boolean = false;
	protected startX: number = 0;
	protected startY: number = 0;
	protected currentX: number = 0;
	protected currentY: number = 0;
	protected savedImg: any = null;

	constructor(protected canvas: HTMLCanvasElement) {
		this.ctx = canvas.getContext('2d');
		this.destroyEvents();
	}

	set fillColor (color: string) {
		if (this.ctx) {
			this.ctx.fillStyle = color;
		}
	}

	set strokeColor(color: string) {
		if (this.ctx) {
			this.ctx.strokeStyle = color;
		}
	}

	set lineWidth(width: number) {
		if (this.ctx) {
			this.ctx.lineWidth = width;
		}
	}

	protected refreshImg (callback: CallableFunction) {
		const img = new Image();
		img.src = this.savedImg;

		img.onload = async () => {
			this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
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
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	protected mouseUpHandler(e: MouseEvent) {
		this.mousedown = false;
	}

	protected mouseDownHandler(e: MouseEvent) {
		this.mousedown = true;
		this.ctx?.beginPath();
	}
	 
	private destroyEvents () {
		this.canvas.onmouseup = null;
		this.canvas.onmousedown = null;
		this.canvas.onmousemove = null;
	}

	protected abstract mouseMoveHandler(e: MouseEvent): void;

	protected abstract draw (...args: any) : void;
}