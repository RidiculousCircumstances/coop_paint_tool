import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';
import toolState from '../store/toolState';
import { observer } from 'mobx-react-lite';
import { Tool } from '../tools/Tool';
import canvasState from '../store/canvasState';

interface INewTool extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	tool: new (canvas: HTMLCanvasElement) => Tool;
}

export const Button = observer ((
	{className, tool, ...props}: INewTool
): JSX.Element => {

	return (
		<button onClick={() => toolState.setTool(new tool(canvasState.canvas!))} 
		className={cn(className,
			'toolbar__btn', 
			{ 'toolbar__btn--active': className === toolState.getToolName()})}/>
	);
})
