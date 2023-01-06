import React from 'react';
import toolState from '../store/toolState';
import "../styles/toolbar.scss";

const SettingBar = () => {
	return ( 
		<div className='setting-bar'>
			<label htmlFor="line-width">Line weight</label>
			<input id="line-width" 
					type='number' 
					defaultValue={2} 
					min={1} 
					max={50}
				onClick={(e) => toolState.setLineWeight((e.target as HTMLInputElement).value as any)} />
			<label htmlFor="stroke-color">Stroke color</label>
			<input id="stroke-color"
				className='strokePalette'
					type="color"
				onChange={(e) => toolState.setStrokeColor((e.target as HTMLInputElement).value)} />
		
		</div>
	 );
}
 
export default SettingBar;
