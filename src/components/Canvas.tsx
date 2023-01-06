import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import "../styles/canvas.scss";
import { Brush } from '../tools/Brush';

const Canvas = observer (() => {

	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
		toolState.setTool(new Brush(canvasRef.current as HTMLCanvasElement));
	}, []);

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current?.toDataURL()!);
	}

	return ( 
		<div className='canvas'>
			<canvas ref={canvasRef} 
					width={1000} 
					height={680}
					onMouseDown={(e) => mouseDownHandler()}
					/>
		</div> 
	);
})
 
export default Canvas;