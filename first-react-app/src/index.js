import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Hello from './component/HelloComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));

const title = React.createElement("h1", { title: "标题" }, "Hello React");
root.render(title);

// 使用JSX语法创建react元素
const jsxTitle = <h1 title='标题'>Hello JSX!</h1>;
root.render(jsxTitle);

// JSX中用 {name} 语法引用js中的变量、函数调用等表达式。（JXS本身也是一个表达式）
const name = "SunChaser";
const sayFun = () => "Say Hi~";
const subJsx = <div>sub JSX</div>;
root.render(
  (
    <div>
      <h1 className='hello-class'>Hello React!!!</h1><br />
      <span>Hello JSX!</span>
      <p>Hello {name}</p>
      <p>{1}</p>
      <p>{'a'}</p>
      <p>{1 + 7}</p>
      <p>{3 > 5 ? "大于" : "不大于"}</p>
      <p>{() => "Hi!~"}</p>
      <p>{sayFun()}</p>
      {subJsx}
      {/* 注释 */}
      {/* {无法使用if for等js语句} */}
    </div>
  )
);

// 条件渲染
const isLoading = false;
const loadData = () => {
  if (isLoading) {
    return <div>loading...</div>
  }
  return <div>Hello condition render!</div>
};
root.render(
  (
    <div>
      {loadData()}
    </div>
  )
);

// 列表渲染
const data = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" }
];
const list = (
  <ul>
    {data.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
);
root.render(
  (
    <div>
      {list}
    </div>
  )
);

// css样式
const style = {
  color: 'red',
  backgroundColor: 'blue'
};
const css = (
  <p className='css-p' style={style}>
    JSX中的CSS
  </p>
);
root.render(
  (
    <div>
      {css}
    </div>
  )
);

// 函数组件
// 方法名为组件名，首字母必须大写，且必须有返回值。
// function HelloFunctionComponent() {
//   return (
//     <div>Hello First Function Component</div>
//   )
// }
// 箭头函数
const HelloFunctionComponent = () => <div>Hello First Function Component</div>;
root.render(<HelloFunctionComponent />);

// 类组件
// 类名为组件名，首字母必须大写，继承ReactComponent，必须提供render方法且有返回值
class HelloClassComponent extends React.Component {

  render() {
    return (
      <div>Hello First Class Component</div>
    );
  }
}
root.render(<HelloClassComponent />);

// 外部独立js文件组件
// import Hello from './component/HelloComponent';
root.render(<Hello />);

// 事件处理
class EventHandle extends React.Component {

  render() {
    return (
      <a href="https://lilu.org.cn" onClick={this.handleClick}>点我！！</a>
    );
  }
  // e: React中的事件对象，合成事件，兼容所有浏览器。
  handleClick(e) {
    // 阻止浏览器默认行为（a标签跳转）
    e.preventDefault();
    console.log('触发了Click点击事件');
  }
}
root.render(<EventHandle />);

// 函数组件又称为无状态组件；类组件又称为有状态组件。所谓状态就是数据。
// 状态是私有的，只能在组件内部进行使用。
// 使用this.state获取状态；this.setState()修改状态。
class Stateful extends React.Component {

  // 构造函数写法
  // constructor() {
  //   super()// ES6固定写法
  //   this.state = {
  //     count: 0 // 初始化count
  //   }
  // }

  constructor() {
    super();
    // Function.prototype.bind(): ES5中的bind方法，将方法中的this与组件实例绑定在一起。
    this.onIncrement = this.onIncrement.bind(this);
  }

  // 简化语法
  state = {
    count: 0 // 初始化count
  };

  render() {
    return (
      <div>
        计数器: count = {this.state.count}
        <br />
        <button onClick={
          () => {
            this.setState({
              count: this.state.count + 1// 设置新值：获取旧值并+1
            })
            // this.state.count += 1;// 错误写法！！！
          }
        }>+1</button>
        {/* 1. 箭头函数中的this指向外部环境，此处为render()方法 */}
        <button onClick={() => this.onIncrement()}>+1</button>
        {/* 2. 使用Function.prototype.bind(): ES5中的bind方法，将方法中的this与组件实例绑定在一起。 */}
        <button onClick={this.onIncrement}>+1</button>
        {/* 3. 将onIncrement改写为箭头函数形式的实例方法【推荐】 */}
        <button onClick={this.onIncrementFun}>+1</button>
      </div>
    );
  }

  onIncrement() {
    console.log("onIncrement中的this: " + this);
    this.setState({
      count: this.state.count + 1// 设置新值：获取旧值并+1
    })
  }

  // 将onIncrement改写为箭头函数形式的实例方法。
  onIncrementFun = () => {
    this.setState({
      count: this.state.count + 1// 设置新值：获取旧值并+1
    })
  }
}
root.render(<Stateful />);

// 表单处理
// 受控组件：表单元素的值受到state控制
class FormHandle extends React.Component {

  state = {
    text: "",
    textarea: "",
    city: "sh",
    checked: false
  };

  render() {
    return (
      <div>
        {/* 输入框 */}
        <input type="text" value={this.state.text} onChange={this.handleText} />
        <br />
        {/* 富文本框 */}
        <textarea value={this.state.textarea} onChange={this.handleTextarea} />
        <br />
        {/* 下拉框 */}
        <select value={this.state.city} onChange={this.handleSelect}>
          <option value="bj">北京</option>
          <option value="sh">上海</option>
          <option value="gz">广州</option>
        </select>
        <br />
        {/* 复选框 */}
        <input type="checkbox" checked={this.state.checked} onChange={this.handleCheckbox}></input>
      </div>
    );
  }

  handleText = (e) => {
    this.setState({
      text: e.target.value
    });
  }

  handleTextarea = (e) => {
    this.setState({
      textarea: e.target.value
    })
  }

  handleSelect = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  handleCheckbox = (e) => {
    this.setState({
      checked: e.target.checked
    })
  }
}
root.render(<FormHandle />);

// 优雅表单处理
// 一个方法处理多个表单事件。每个表单元素添加name属性，值和state中的字段名相同。
class ElegantFormHandle extends React.Component {

  state = {
    text: "",
    textarea: "",
    city: "sh",
    checked: false
  };

  render() {
    return (
      <div>
        {/* 输入框 */}
        <input name="text" type="text" value={this.state.text} onChange={this.handleChangeEvent} />
        <br />
        {/* 富文本框 */}
        <textarea name="textarea" value={this.state.textarea} onChange={this.handleChangeEvent} />
        <br />
        {/* 下拉框 */}
        <select name="city" value={this.state.city} onChange={this.handleChangeEvent}>
          <option value="bj">北京</option>
          <option value="sh">上海</option>
          <option value="gz">广州</option>
        </select>
        <br />
        {/* 复选框 */}
        <input name="checked" type="checkbox" checked={this.state.checked} onChange={this.handleChangeEvent}></input>
      </div>
    );
  }

  handleChangeEvent = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }
}
root.render(<ElegantFormHandle />)

// 非受控组件：借助于ref，使用原生DOM方式来获取表单元素值
// ref作用：获取DOM或组件
class FormRef extends React.Component {

  constructor() {
    super();
    // 调用React.createRef();方法创建一个ref对象
    this.textRef = React.createRef();
  }

  render() {
    return (
      <div>
        {/* 将创建好的ref对象添加到input输入框 */}
        <input type="text" ref={this.textRef} />
        <button onClick={this.getText}>取值</button>
      </div>
    )
  }

  getText = () => {
    // 通过ref对象获取input输入框的值
    console.log("text=", this.textRef.current.value);
  }
}
root.render(<FormRef />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
