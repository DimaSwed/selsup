import React, { Component } from 'react'
import './App.css'

interface Param {
	id: number
	name: string
	type: 'string'
}

interface ParamValue {
	paramId: number
	value: string
}

interface Model {
	paramValues: ParamValue[]
	colors: Color[]
}

interface Color {
	name: string
	hex: string
}
interface Props {
	params: Param[]
	model: Model
}

interface State {
	paramValues: Record<number, string>
}

class ParamEditor extends Component<Props, State> {
	constructor(props: Props) {
		super(props)

		const initialValues: Record<number, string> = {}
		props.model.paramValues.forEach(paramValue => {
			initialValues[paramValue.paramId] = paramValue.value
		})

		this.state = {
			paramValues: initialValues
		}
	}

	handleParamChange = (paramId: number, value: string) => {
		this.setState(
			prevState => ({
				paramValues: {
					...prevState.paramValues,
					[paramId]: value
				}
			}),
			() => {
				// Для того, чтобы увидеть в консоли актуальные данные
				console.log(this.getModel())
			}
		)
	}

	public getModel(): Model {
		const { paramValues } = this.state
		const { colors } = this.props.model

		return {
			paramValues: Object.keys(paramValues).map(paramId => ({
				paramId: Number(paramId),
				value: paramValues[Number(paramId)]
			})),
			colors: [...colors]
		}
	}

	render() {
		const { params } = this.props
		const { paramValues } = this.state

		return (
			<div
				style={{
					maxWidth: '400px',
					margin: '20px auto',
					fontFamily: 'Arial'
				}}
			>
				<h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
					Редактор параметров
				</h2>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 2fr',
						gap: '10px'
					}}
				>
					{params.map(param => (
						<React.Fragment key={param.id}>
							<label
								style={{
									display: 'flex',
									alignItems: 'center',
									fontWeight: 'bold'
								}}
							>
								{param.name}
							</label>
							<input
								type="text"
								value={paramValues[param.id] || ''}
								onChange={e =>
									this.handleParamChange(
										param.id,
										e.target.value
									)
								}
								style={{
									padding: '8px',
									border: '1px solid #ccc',
									borderRadius: '4px',
									fontSize: '14px'
								}}
							/>
						</React.Fragment>
					))}
				</div>
			</div>
		)
	}
}

const App: React.FC = () => {
	const params: Param[] = [
		{ id: 1, name: 'Назначение', type: 'string' },
		{ id: 2, name: 'Длина', type: 'string' }
	]

	const model: Model = {
		paramValues: [
			{ paramId: 1, value: 'повседневное' },
			{ paramId: 2, value: 'макси' }
		],
		colors: []
	}

	return (
		<div>
			<ParamEditor params={params} model={model} />
		</div>
	)
}

export default App

// Вариант функционального компонента

// import React, { useState, useEffect, useCallback } from 'react'
// import './App.css'

// interface Param {
// 	id: number
// 	name: string
// 	type: 'string'
// }

// interface ParamValue {
// 	paramId: number
// 	value: string
// }

// interface Model {
// 	paramValues: ParamValue[]
// 	colors: Color[]
// }
// interface Color {
// 	name: string
// 	hex: string
// }
// interface Props {
// 	params: Param[]
// 	model: Model
// }

// const ParamEditor: React.FC<Props> = ({ params, model }) => {
// 	const [paramValues, setParamValues] = useState<Record<number, string>>({})

// 	useEffect(() => {
// 		const initialValues: Record<number, string> = {}
// 		model.paramValues.forEach(paramValue => {
// 			initialValues[paramValue.paramId] = paramValue.value
// 		})
// 		setParamValues(initialValues)
// 	}, [model.paramValues])

// 	const handleParamChange = useCallback((paramId: number, value: string) => {
// 		setParamValues(prev => ({
// 			...prev,
// 			[paramId]: value
// 		}))
// 	}, [])

// 	const getModel = useCallback((): Model => {
// 		return {
// 			paramValues: Object.keys(paramValues).map(paramId => ({
// 				paramId: Number(paramId),
// 				value: paramValues[Number(paramId)]
// 			})),
// 			colors: [...model.colors]
// 		}
// 	}, [paramValues, model.colors])

// 	// Для демонстрации работы getModel
// 	useEffect(() => {
// 		console.log('Current model:', getModel())
// 	}, [paramValues, getModel])

// 	return (
// 		<div
// 			style={{
// 				maxWidth: '400px',
// 				margin: '20px auto',
// 				fontFamily: 'Arial'
// 			}}
// 		>
// 			<h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
// 				Редактор параметров
// 			</h2>
// 			<div
// 				style={{
// 					display: 'grid',
// 					gridTemplateColumns: '1fr 2fr',
// 					gap: '10px'
// 				}}
// 			>
// 				{params.map(param => (
// 					<React.Fragment key={param.id}>
// 						<label
// 							style={{
// 								display: 'flex',
// 								alignItems: 'center',
// 								fontWeight: 'bold'
// 							}}
// 						>
// 							{param.name}
// 						</label>
// 						<input
// 							type="text"
// 							value={paramValues[param.id] || ''}
// 							onChange={e =>
// 								handleParamChange(param.id, e.target.value)
// 							}
// 							style={{
// 								padding: '8px',
// 								border: '1px solid #ccc',
// 								borderRadius: '4px',
// 								fontSize: '14px'
// 							}}
// 						/>
// 					</React.Fragment>
// 				))}
// 			</div>
// 		</div>
// 	)
// }

// const App: React.FC = () => {
// 	const params: Param[] = [
// 		{ id: 1, name: 'Назначение', type: 'string' },
// 		{ id: 2, name: 'Длина', type: 'string' }
// 	]

// 	const model: Model = {
// 		paramValues: [
// 			{ paramId: 1, value: 'повседневное' },
// 			{ paramId: 2, value: 'макси' }
// 		],
// 		colors: []
// 	}

// 	return (
// 		<div>
// 			<ParamEditor params={params} model={model} />
// 		</div>
// 	)
// }

// export default App
