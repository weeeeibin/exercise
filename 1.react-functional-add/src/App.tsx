import React, { useState } from 'react';
import './App.css';

/**
 * 已知有一个远程加法
 * @param a
 * @param b
 * @returns
 */
async function addRemote(a: number, b: number) {
	await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
	return a + b;
}

/**
 * 请实现本地的 add 方法，调用 addRemote，能最优的实现输入数字的加法。
 * @example
 * ```
 * add(5, 6).then(result => {
 *   console.log(result); // 11
 * });
 * add(1, 4, 3, 3, 5).then(result => {
 *   console.log(result); // 16
 * })
 * add(2, 3, 3, 3, 4, 1, 3, 3, 5).then(result => {
 *   console.log(result); // 27
 * })
 * ```
 */
async function add(...inputs: number[]) {
	const promises = [];
	const length = Math.trunc(inputs.length / 2);
	for (let i = 0; i < length; i++) {
		promises.push(addRemote(inputs[i * 2], inputs[i * 2 + 1]));
	}
	let sum = 0;
	const res = await Promise.all(promises);
	res.forEach(element => {
		sum += element;
	});
	if(inputs.length %2 !== 0){
		sum = await addRemote(sum,inputs.pop() as number)
	}
	return sum
	// 你的实现
}

function App() {

	const [value, setValue] = useState<any>();
	const [sum, setSum] = useState<number>(0);

	const onAdd = () => {
		let inputs = value.split(',');
		inputs = inputs.filter((item: string) => /[0-9]/.test(item));
		inputs = inputs.map((item: string) => Number(item))
		add(...inputs).then(res => setSum(res));
	}

	return (
		<div className="App">
			<header className="App-header">
				<div>请实现add 方法，当用户在输入框中输入多个数字(逗号隔开)后，</div>
				<div>点击相加按钮能显示最终结果</div>
			</header>
			<section className="App-content">
				<input type="text" placeholder="请输入要相加的数字（如1,3,4,5,6）" onChange={(e) => setValue(e.target.value)} />
				<button onClick={onAdd}>相加</button>
			</section>
			<section className="App-result">
				<p>
					相加结果是：<span>{sum}</span>
				</p>
			</section>
		</div>
	);
}

export default App;