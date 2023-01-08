import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import "../styles/canvas.scss";
import { Brush } from '../tools/Brush';
import { ModalPopup } from './Modal';
import { useParams } from 'react-router-dom';
import { Rect } from '../tools/Rect';
import { Tool } from '../tools/Tool';
import { Circle } from '../tools/Circle';
import { Line } from '../tools/Line';
import { Eraser } from '../tools/Eraser';
import axios from 'axios';
import { CONST } from '../Const';

const Canvas = observer (() => {

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const params = useParams();

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current);
		canvasState.setSessionId(params.id!);
		const ctx = (canvasRef.current as HTMLCanvasElement).getContext('2d');
		axios.get(`${CONST.HTTPURL}/image?id=${params.id}`)
			.then(res => {
				const img = new Image()
				img.src = res.data
				img.onload = () => {
					const canvas = canvasRef.current as HTMLCanvasElement;
					ctx?.clearRect(0, 0, canvas.width, canvas.height)
					ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
				}
			});
	}, []);

	
	useEffect(() => {
		if (canvasState.username !== '') {
			const socket = new WebSocket(CONST.SOCKET_URL);
			canvasState.setSocket(socket);
			toolState.setTool(new Brush(canvasRef.current as HTMLCanvasElement, socket, params.id!));

			socket.onopen = () => {
				socket.send(JSON.stringify({
					id: params.id,
					username: canvasState.username,
					method: 'connection'
				}));
			}

		socket.onmessage = (e) => {
			const msg = JSON.parse(e.data);
			
			switch (msg.method) {
				case 'connection':
						alert(`User ${msg.username} joined`);
					break;
				case 'draw':
						drawHandler(msg);
					break;
			}
		}
	}
	}, [canvasState.username, params.id]);

	useEffect (() => {
		const ctx = (canvasRef.current as HTMLCanvasElement).getContext('2d');
		axios.get(`${CONST.HTTPURL}/image?id=${params.id}`)
			.then(res => {
				const img = new Image()
				img.src = res.data
				img.onload = () => {
					const canvas = canvasRef.current as HTMLCanvasElement;
					ctx?.clearRect(0, 0, canvas.width, canvas.height)
					ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
				}
			});
	}, [canvasState.width, canvasState.height]);

	const drawHandler = (msg: Record<any, any>) => {
		const figure = msg.figure;
		const ctx = (canvasRef.current as HTMLCanvasElement).getContext('2d');

		switch (figure.type) {
			case 'brush':
				Brush.draw(figure.x, figure.y, figure.fillStyle,
							 figure.strokeColor,figure.lineWeight)
				break;
			case 'rect':
				Rect.draw(figure.x, figure.y, figure.w, 
					figure.h, figure.fillStyle, figure.strokeColor, 
			figure.lineWeight, 'stream');
				break;
			case 'circle':
				Circle.draw(figure.x, figure.y, figure.rX,
					figure.rY, figure.fillStyle, figure.strokeColor,
					figure.lineWeight, 'stream');
				break;
			case 'line':
				Line.draw(figure.sX, figure.sY, figure.cX, 
					figure.cY, figure.fillStyle, figure.strokeColor, figure.lineWeight, 'stream');
				break;
			case 'eraser':
				Eraser.draw(figure.x, figure.y, figure.lineWeight, 'stream');
				break;
			case 'finish':
				ctx?.beginPath();
				break;
		}
	}

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current?.toDataURL()!);
	}

	const mouseUpHandler = () => {
		axios.post(`${CONST.HTTPURL}/image?id=${params.id}`, { img: canvasRef.current?.toDataURL()})
			.then((res) => console.log(res.data));;
	}

	return (
		<div className='canvas'>

			<ModalPopup	/>
			<canvas ref={canvasRef} 
					width={canvasState.width} 
					height={canvasState.height}
					onMouseDown={(e) => mouseDownHandler()}
					onMouseUp={(e) => mouseUpHandler()}
					/>
		</div> 
	);
})
 
export default Canvas;