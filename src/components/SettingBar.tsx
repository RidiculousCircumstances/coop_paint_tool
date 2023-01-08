import React, { useState } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import "../styles/toolbar.scss";

const SettingBar = () => {

	const [width, setWidth] = useState(1200);
	const [height, setHeight] = useState(800);

	return ( 
		<div className='setting-bar'>
			<label htmlFor="line-width">Line weight</label>
			<input id="line-width" 
					className='strokePalette'
					type='number' 
					defaultValue={2} 
					min={1} 
					max={100}
				onClick={(e) => toolState.setLineWeight((e.target as HTMLInputElement).value as any)} />
			<label htmlFor="stroke-color">Stroke color</label>
			<input id="stroke-color"
				className='strokePalette'
					type="color"
				onChange={(e) => toolState.setStrokeColor((e.target as HTMLInputElement).value)} />
			
			<label htmlFor="canvas-width">Canvas width</label>
			<input id="canvas-width"
				className='strokePalette'
				type="number"
				value={width}
				min={400}
				max={1900}
				onChange={(e) => {
					canvasState.setWidth((e.target as HTMLInputElement).value as any)
					setWidth((e.target as HTMLInputElement).value as any);
					}} />

			<label htmlFor="canvas-height">Canvas height</label>
			<input id="canvas-height"
				className='strokePalette'
				type="number"
				value={height}
				min={400}
				max={800}
				onChange={(e) => {
					canvasState.setHeigt((e.target as HTMLInputElement).value as any)
					setHeight((e.target as HTMLInputElement).value as any);
				}} />
		</div>
	 );
}
 
export default SettingBar;
