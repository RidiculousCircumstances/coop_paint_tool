import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import "../styles/toolbar.scss";
import { Brush } from '../tools/Brush';
import { Circle } from '../tools/Circle';
import { Eraser } from '../tools/Eraser';
import { Line } from '../tools/Line';
import { Rect } from '../tools/Rect';
import { Button } from './Button';

const Toolbar = observer (() => {

	const changeColor = (e: ChangeEvent) => {
		toolState.setStrokeColor((e.target as HTMLInputElement).value);
		toolState.setFillColor((e.target as HTMLInputElement).value);
	}

	const download = () => {
		console.log('sss');
		const dataUrl = canvasState.canvas!.toDataURL();
		const a = document.createElement('a');
		a.href = dataUrl;
		a.download = canvasState.sessionId + '.jpg';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	
	}

	return ( 
		<div className='toolbar'>	
			<Button className='brush' tool={ Brush } />
			<Button className='rect' tool={ Rect} />
			<Button className='circle' tool={ Circle } />
			<Button className='line' tool={ Line } />
			<Button className='eraser' tool={ Eraser } />
			<input type='color'
					className='toolbar__btn palette'
					onChange={(e) => changeColor(e)} />
			<button className='toolbar__btn undo' onClick={() => {canvasState.undo()}} />
			<button className='toolbar__btn redo' onClick={() => canvasState.redo()} />
			<button className='toolbar__btn save' onClick={() => download()}></button>
		</div>
	 );
})

export default Toolbar;