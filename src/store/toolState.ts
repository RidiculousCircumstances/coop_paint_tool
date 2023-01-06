import { makeAutoObservable } from 'mobx';
import { Tool } from '../tools/Tool';

class ToolState {

	tool: Tool | null = null;

	constructor () {
		makeAutoObservable(this);
	}

	setTool (tool: Tool) {
		this.tool = tool;
	}

	setFillColor(color: string) {
		this.tool!.fillColor = color;
	}

	setStrokeColor(color: string) {
		this.tool!.strokeColor = color;
	}

	setLineWeight(weight: number) {
		this.tool!.lineWidth = weight;
	}
}

export default new ToolState();