{
	//取输出框
	const output = document.querySelector(".output");
	//设置对象保存变量
	let bl = {
		num1: '',
		num2: '',
		xsd: false,
		ac: false,
		ac1: false,
		num3: '',
		symbol: '',
		symbol1: '',
	}
	//数值框调用输出函数
	let AzS = (num) => {
		if (bl.num1.length < 15) {
			bl.num1 += num;
			bl.num3 = bl.num1;
		}
		output.innerHTML = bl.num1;
	};
	//重置函数
	let	Empty = () => {
			bl.num1 = '';
			bl.num2 = '';
			bl.num3 = '';
			bl.xsd = false;
			ac = false,
			ac1 = false,
			bl.symbol = '';
			bl.symbol1 = '';
			output.innerHTML = 0;
	};
	//退格函数
	let	fb = () => {
			if (bl.num1.length > 1) {
				bl.num1 = bl.num1.substring(0, bl.num1.length - 1);
				output.innerHTML = bl.num1;
			}
			else {
				bl.num1 = '';
				output.innerHTML = '0';
			}
	};
	//计算函数
	let js = (n) => {
		//小数点精确计算，将小数变成整数
		let n1 = bl.num2.split('.')[1], n2 = bl.num3.split('.')[1];
		if (n1 && n2) {
			if (n1.length >= n2.length) {
				bl.num2 = bl.num2 * Math.pow(10, n1.length);
				bl.num3 = bl.num3 * Math.pow(10, n1.length);
				bl.ac1 = true;
			}
			else {
				bl.num2 = bl.num2 * Math.pow(10, n2.length);
				bl.num3 = bl.num3 * Math.pow(10, n2.length);
			}
			bl.ac = true;
		}
		bl.xsd = false;
		switch (n) {
			case '+':
				bl.num2 = String(Number(bl.num2) + Number(bl.num3));
				break;
			case '-':
				bl.num2 = String(Number(bl.num2) - Number(bl.num3));
				break;
			case '*':
				bl.num2 = String(Number(bl.num2) * Number(bl.num3));
				break;	
			case '÷':
				if (!Number(bl.num3)) {
					bl.num2 = '0';
					break;
				}
				bl.num2 = String(Number(bl.num2) / Number(bl.num3));
				break;
			default:						//第一次使用运算符
				if (bl.symbol1 !== '=') {
					bl.num2 = bl.num1;
					if (!bl.num1) {
						bl.num2 = '0';
					}
				}					
		}
		//小数点精确计算的数值恢复
		if (bl.ac && bl.ac1) {
			bl.num2 = String(bl.num2 / Math.pow(10, n1.length));
			bl.num3 = String(bl.num3 / Math.pow(10, n1.length));
			bl.ac = false;
		}
		else if (bl.ac) {
			bl.num2 = String(bl.num2 / Math.pow(10, n2.length));
			bl.num3 = String(bl.num3 / Math.pow(10, n1.length));
		}	
		if (bl.num2.length > 15 || isNaN(bl.num2)) {
			bl.num2 = '数值过大'
		}
		output.innerHTML = bl.num2;
		bl.num1 = '';
		console.log(bl.num2, bl.num3);
	}
	//功能键识别函数
	let ct = (n) => {
		switch (n) {
			case '←':
				fb();
				break;
			case 'C':
				Empty();
				break;
			case '.':
				if (!bl.xsd) {
					bl.num1 += '.';
					output.innerHTML = bl.num1;
					bl.xsd = true;
				}
				break;
			case '+':
			case '-':
			case '*':
			case '÷':
			case '=':
				//将上一个运算符当做函数
				js(bl.symbol);
				break;
		}
	}
	//事件函数
	document.addEventListener("click", function (event) {
		let et = (event || window.event).target;
		let e = et.firstChild.nodeValue;
		//识别是否点击到li元素
		if (et.tagName === 'LI') {
			//识别是否为数值框
			if (!isNaN(e)) {
				AzS(e);
			}
			else {
				if (e !== '=' && e !== '.' && e !== 'C' && e !== '←') {
					if (bl.symbol1 === '=') {
						bl.symbol = '';
					}
					//先运行功能键识别函数，后将运算符记录到bl.symbol
					ct(e);
					bl.symbol = e;
					bl.symbol1 = '';
				}
				else {
					ct(e);
					bl.symbol1 = e;
				}
			}
		}
	},false);
}