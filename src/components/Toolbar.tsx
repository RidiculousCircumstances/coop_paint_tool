import React, { ChangeEvent } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import "../styles/toolbar.scss";
import { Brush } from '../tools/Brush';
import { Circle } from '../tools/Circle';
import { Eraser } from '../tools/Eraser';
import { Line } from '../tools/Line';
import { Rect } from '../tools/Rect';

const Toolbar = () => {

	const changeColor = (e: ChangeEvent) => {
		toolState.setStrokeColor((e.target as HTMLInputElement).value);
		toolState.setFillColor((e.target as HTMLInputElement).value);
	}

	return ( 
		<div className='toolbar'>
			<button className='toolbar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas!))} />
			<button className='toolbar__btn rectangle' onClick={() => toolState.setTool(new Rect(canvasState.canvas!))} />
			<button className='toolbar__btn circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas!))} />
			<button className='toolbar__btn line' onClick={() => toolState.setTool(new Line(canvasState.canvas!))} />
			<button className='toolbar__btn eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas!))} />
			<input type='color'
					className='toolbar__btn palette'
					onChange={(e) => changeColor(e)} />
			<button className='toolbar__btn undo' onClick={() => canvasState.undo()} />
			<button className='toolbar__btn redo' onClick={() => canvasState.redo()} />
			<button className='toolbar__btn save'></button>
		</div>
	 );
}
 
export default Toolbar;