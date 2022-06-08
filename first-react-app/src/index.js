import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useRoutes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Hello from './component/HelloComponent';
// props类型校验
import PropTypes from 'prop-types';
// 导入图片资源
import img from './assets/images/logo192.png';
import routes from './routes';

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


/**
 * props
 * 函数组件传递接收props数据
 * 
 * @param {*} props 
 * @returns HelloFunProps
 */
const HelloPropsFun = props => {
  console.log(props);
  return (
    <div>
      <h1>props: {props.name}</h1>
    </div>
  );
}
root.render(<HelloPropsFun name="SunChaser" age={19} />)

/**
 * 类组件传递接收props数据
 */
class HelloPropsClass extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>props: {this.props.name}</h1>
      </div>
    );
  }
}
root.render(<HelloPropsClass name="SunChaser" />)

/**
 * props特性：
 * 1. props能传递任意类型的数据。
 * 2. props是只读属性，无法进行修改。
 * 3. 类组件中如果有构造函数constructor()，应该将props传递给super()，否则在构造函数中无法获取到props。
 * 
 * 函数组件接收props前面不加this，类组件接收props前面需要加this。
 */
class PropsTypeClass extends React.Component {

  constructor(props) {
    super(props);
    console.log("constructor: ");
    console.log(this.props);
  }

  render() {
    console.log("render: ");
    console.log(this.props);
    // 调用传递进来的方法
    this.props.fun();
    return (
      <div>
        <h1>props: {this.props.name}</h1>
        {/* 渲染传递进来的JSX */}
        {this.props.tag}
      </div>
    );
  }
}
root.render(
  <PropsTypeClass
    name="SunChaser"
    age={19}
    colors={['red', 'green', 'blue']}
    fun={() => console.log("props传递一个函数")}
    tag={<p>props传递JSX</p>}
  />
)

/**
 * 组件通讯之父组件传值给子组件
 */
class ParentComponent extends React.Component {

  state = {
    lastName: "王"
  }

  render() {
    return (
      <div>
        父组件传值给子组件：<ChildrenComponent lastName={this.state.lastName} />
      </div>
    );
  }
}

class ChildrenComponent extends React.Component {

  render() {
    return (
      <div>子组件接收到数据：{this.props.lastName}</div>
    );
  }
}

root.render(<ParentComponent />);

/**
 * 组件通讯之子组件传值给父组件
 */
class ParentComponent2 extends React.Component {

  state = {
    parentData: ''
  }

  // 提供回调函数（接收子组件传递的数据）
  getChildData = (data) => {
    console.log("接收到子组件传递的数据：" + data);
    this.setState({
      parentData: data
    })
  }

  render() {
    return (
      <div>父组件：{this.state.parentData}
        <ChildrenComponent2 getData={this.getChildData} />
      </div>
    );
  }
}

class ChildrenComponent2 extends React.Component {

  state = {
    childData: '子组件的数据childData'
  }

  render() {
    return (
      <div>子组件：<button onClick={this.handleClick}>点击传值给父组件</button></div>
    );
  }

  handleClick = () => {
    this.props.getData(this.state.childData);
  }
}
root.render(<ParentComponent2 />)

/**
 * 组件通讯之兄弟组件传值
 * 
 * 将共享状态提升到最近的公共父组件中，由公共父组件管理这个状态。
 * 父组件职责：1. 提供共享状态。2. 提供操作共享状态的方法。
 * 子组件通过props接收共享状态的值或操作共享状态的方法。
 */
class Counter extends React.Component {

  state = {
    count: 0
  }

  render() {
    return (
      <div>
        <Child1 count={this.state.count} />
        <Child2 onIncrement={this.onIncrement} />
      </div>
    );
  }

  onIncrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
}

const Child1 = (props) => {
  return <h1>计数器：{props.count}</h1>
}

const Child2 = (props) => {
  // 调用props传递进来的方法
  return <button onClick={() => props.onIncrement()}>+1</button>
}
root.render(<Counter />)

/**
 * Context: 跨组件传递数据
 * 
 * 使用步骤：
 * 1. 调用React.createContext()创建Provider（提供数据）和Consumer（消费数据）两个组件。
 * 2. 使用Provider组件作为父节点。
 * 3. 给Provider组件设置value属性，表示要传递的数据。
 * 4. 调用Consumer组件接收数据。
 */

const { Provider, Consumer } = React.createContext();

class App extends React.Component {

  render() {
    return (
      <Provider value="SunChaser">
        <div>
          <Node />
        </div>
      </Provider>
    );
  }
}

class Node extends React.Component {

  render() {
    return (
      <div>
        <SubNode />
      </div>
    );
  }
}

const SubNode = () => {
  return (
    <div>
      <Child />
    </div>
  );
}

const Child = () => {
  return (
    <div>
      child组件
      <Consumer>
        {
          data => <span>{data}</span>
        }
      </Consumer>
    </div>
  );
}
root.render(<App />);

/**
 * 组件标签的子节点：props.children
 * children属性：当组件标签有子节点时，props自动有children属性。
 * 和普通props属性一样，children可以为文本、React元素、组件及函数等任意值。
 */
class PropsChildren extends React.Component {

  render() {
    return (
      <div>
        <h1>组件标签的子节点:props.children</h1>
        {this.props.children}
      </div>
    );
  }
}
root.render(
  <PropsChildren>
    <div>组件子节点</div>
  </PropsChildren>
);

/**
 * props校验。
 * 需要安装prop-types依赖（npm install prop-types）
 */
class PropsChecked extends React.Component {

  render() {
    return (
      <div>
        props checked
        <ul>
          {this.props.colors.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

// 常见类型: array、bool、func、number、object、string
// React元素类型：element
// 必填项：isRequired
// 特定结构的对象：shape({ })
// https://reactjs.org/docs/typechecking-with-proptypes.html
PropsChecked.propTypes = {
  colors: PropTypes.array.isRequired,
  age: PropTypes.number,
  doSomething: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    area: PropTypes.string,
    price: PropTypes.number
  })
}
root.render(<PropsChecked colors={["red", "blue"]} doSomething={() => { }} />)

/**
 * props默认值
 */
class DefaultValue extends React.Component {

  render() {
    return (
      <div>
        props默认值:{this.props.size}
      </div>
    );
  }
}

DefaultValue.defaultProps = {
  size: 10
}
root.render(<DefaultValue />);

/**
 * 类组件生命周期
 * https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
 * https://zh-hans.reactjs.org/docs/react-component.html
 */

/**
 * 1. 创建时（挂载阶段）
 * constructor：创建组件时触发。初始化state，为事件处理程序绑定this指向。
 * render：每次组件渲染都会执行。渲染UI。
 * 钩子函数componentDidMount：组件挂载（完成DOM渲染）后触发。操作DOM；发送网络请求。
 * 
 * 执行顺序：constructor -> render -> componentDidMount
 */
class CreatingLifeCycle extends React.Component {

  constructor() {
    super();
    console.warn("生命周期钩子函数:constructor");
  }

  componentDidMount() {
    console.warn("生命周期钩子函数:componentDidMount");
  }

  render() {
    console.warn("生命周期钩子函数:render");
    return (
      <div>
      </div>
    );
  }
}
root.render(<CreatingLifeCycle />);

/**
 * 2. 更新时（更新阶段）
 * 执行时机：
 * 1. setState()
 * 2. forceUpdate()
 * 3. 组件接收到新的props
 * 4. 钩子函数componentDidUpdate
 * 
 * 执行顺序：render -> componentDidUpdate
 */
class UpdatingLifeCycle extends React.Component {

  state = {
    count: 0
  }

  render() {
    console.warn("生命周期钩子函数:render");
    return (
      <div>
        <Count count={this.state.count} />
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }

  handleClick = () => {
    // this.forceUpdate();
    this.setState({
      count: this.state.count + 1
    });
  }
}

class Count extends React.Component {

  render() {
    console.warn("子组件--生命周期钩子函数:render");
    return (
      <div id="count">count: {this.props.count}</div>
    );
  }

  /**
   * 调用setState更新状态或者发送网络请求操作必须放在一个if条件中
   */
  componentDidUpdate(preProps) {
    console.warn("子组件--生命周期钩子函数:componentDidUpdate");
    const count = document.getElementById("count");
    console.log(count.innerHTML);

    console.log("更新前的props", preProps, ", 当前的props", this.props);
    if (preProps.count !== this.props.count) {// 避免递归更新
      // this.setState({})
      // 发送网络请求
    }
  }
}
root.render(<UpdatingLifeCycle />);

/**
 * 3. 卸载时（卸载阶段）
 * 执行时机：组件从页面中消失。
 * 钩子函数：componentWillUnmount
 * 一般用来执行清理工作（例如清理定时器）。
 */
class UninstallingLifeCycle extends React.Component {

  state = {
    count: 0
  }

  render() {
    return (
      <div>
        {
          this.state.count > 3 ? <p>加爆了</p> : <UninstallCount count={this.state.count} />
        }
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  }
}

class UninstallCount extends React.Component {

  componentDidMount() {
    // 设置定时器
    this.timerId = setInterval(() => {
      console.log("定时器执行...")
    }, 500);
  }

  render() {
    console.warn("子组件--生命周期钩子函数:render");
    return (
      <div id="count">count: {this.props.count}</div>
    );
  }

  componentWillUnmount() {
    console.warn("子组件--生命周期钩子函数:componentWillUnmount");
    // 清理定时器
    clearInterval(this.timerId);
  }
}
root.render(<UninstallingLifeCycle />);

/**
 * 状态逻辑复用
 * render-props模式：props是一个函数，其返回值是组件要渲染的内容。
 * 使用步骤：
 * 1. 创建Mouse组件，在组件中提供复用的状态逻辑代码（状态和操作状态的方法）。
 * 2. 将要复用的状态作为props.render(state)方法的参数，暴露到组件外部。
 * 3. 使用props.render()的返回值作为要渲染的内容。
 */
class Mouse extends React.Component {

  state = {
    x: 0,
    y: 0
  }

  render() {
    return this.props.children(this.state);
  }

  // 生命周期方法中监听鼠标移动事件
  componentDidMount() {
    window.addEventListener("mousemove", this.handleMousemove);
  }

  // 组件卸载时移除鼠标移动监听事件
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMousemove);
  }

  handleMousemove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }
}

// Mouse组件props校验
Mouse.propTypes = {
  children: PropTypes.func.isRequired // children是一个函数且必填
}

// 将箭头函数传递给子组件Mouse的renderFun这个props
// 子组件Mouse中的render方法调用传入的renderFun箭头函数并传递子组件Mouse的状态state
// 箭头函数中获取state并返回JSX给子组件的render方法进行渲染。
class MouseApp extends React.Component {

  render() {
    return (
      <div>
        <p>render-props模式</p>
        {/* <Mouse
          renderFun={
            (mouse) => {
              return <p>鼠标位置：[{mouse.x}, {mouse.y}]</p>
            }
          }
        />
        <Mouse
          renderFun={
            (mouse) => {
              return (
                <img
                  src={img}
                  alt="图片"
                  style={
                    {
                      position: 'absolute',
                      top: mouse.y - 96,
                      left: mouse.x - 96
                    }
                  }
                />
              )
            }
          }
        /> */}

        {/*
        children代替renderFun：
        例如跨组件传递数据的Context中的Consumer用法：
        <Consumer>
          {
            data => <span>{data}</span>
          }
        </Consumer>
         */}
        <Mouse>
          {
            (mouse) => {
              return <p>鼠标位置：[{mouse.x}, {mouse.y}]</p>
            }
          }
        </Mouse>
        <Mouse>
          {
            (mouse) => {
              return (
                <img
                  src={img}
                  alt="图片"
                  style={
                    {
                      position: 'absolute',
                      top: mouse.y - 96,
                      left: mouse.x - 96
                    }
                  }
                />
              )
            }
          }
        </Mouse>
      </div>
    );
  }
}
root.render(<MouseApp />);

/**
 * 高阶组件：HOC（Higher-Order Component）。是一个函数，接收要包装的组件，返回增强后的组件。（装饰器设计模式）
 * 使用步骤：
 * 1. 创建一个函数，名称约定以with开头。
 * 2. 指定函数参数，参数以大写字母开头（作为要渲染的组件）。
 * 3. 在函数内部创建一个类组件，提供复用的状态逻辑代码。函数的返回值为该类组件。
 * 4. 在类组件中，渲染参数组件，同时将状态通过props传递给参数组件。
 */
function withMouse(WrappedComponent) {  // 1. 创建一个函数，名称约定以with开头。// 2. 指定函数参数，参数以大写字母开头（作为要渲染的组件）。

  class Mouse extends React.Component {

    state = {
      x: 0,
      y: 0
    }

    componentDidMount() {
      window.addEventListener("mousemove", this.handleMousemove);
    }

    componentWillUnmount() {
      window.removeEventListener("mousemove", this.handleMousemove);
    }

    handleMousemove = e => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }

    render() {
      // 4. 在类组件中，渲染参数组件，同时将状态通过props传递给参数组件。
      return (
        // 向下传递props避免丢失
        <WrappedComponent {...this.state} {...this.props} />
      )
    }
  }

  // 设置Mouse的displayName，避免使用高阶组件时得到两个同名的组件（默认情况下React使用组件名称作为displayName）。
  // 公共WithMouse前缀
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`;

  // 3. 在函数内部创建一个类组件，提供复用的状态逻辑代码。函数的返回值为该类组件。
  return Mouse;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// 函数组件Position
const Position = (props) => {
  return (
    <p>
      鼠标位置：[{props.x}, {props.y}]
    </p>
  )
}

const Img = (props) => (
  <img
    src={img}
    alt="图片"
    style={
      {
        position: 'absolute',
        top: props.y - 96,
        left: props.x - 96
      }
    }
  />
);

// 获取增强后的组件
const MousePosition = withMouse(Position);
const MouseImg = withMouse(Img);

class EnhanceComponent extends React.Component {
  render() {
    return (
      <div>
        <p>高阶组件</p>
        {/* 渲染增强后的组件 */}
        <MousePosition />
        <MouseImg />
      </div>
    );
  }
}
root.render(<EnhanceComponent />);

/**
 * setState()方法是异步更新数据的。使用该语法时，后面的setState()不要依赖于前面的setState()
 * 多次调用setState()方法只会触发一次render重新渲染。
 * 
 * 推荐语法: setState((state, props) => {})
 * 回调函数（也是异步更新数据）
 * 
 * state: 最新的state
 * props: 最新的props
 * 
 * this.setState((state, props) => {
 *   return {
 *     count: state.count + 1
 *   }
 * });
 * 
 * setState(updater[, callback])
 * 第二个参数：callback回调函数。状态更新完后并且render重新渲染后立即执行。
 */

/**
 * JSX是createElement()方法的语法糖
 * JSX语法被@babel/preset-react插件编译为createElement()方法
 * React元素：是一个对象，描述在浏览器页面上显示的内容。
 */

/**
 * 组件更新机制：
 * setState()方法的两个作用：
 * 1. 修改state。
 * 2. 更新组件UI（重新渲染）。
 * 父组件重新渲染时，当前组件及其所有子组件都会重新渲染。
 */

/**
 * 组件性能优化：
 * 1. 减轻state：只存储和组件渲染相关的数据。对于需要在多个方法之间共用的数据，建议放到this中。
 * 2. 避免不必要的重新渲染：使用更新阶段的钩子函数shouldComponentUpdate(nextProps, nextState)，组件重新渲染（render）前会执行，当返回false时不会重新渲染。
 * 3. 纯组件：React.PureComponent，自动实现shouldComponentUpdate钩子函数，内部通过比较前后两次props和state的值来决定是否重新渲染组件。
 */
class RandomNumber extends React.Component {

  state = {
    number: 0
  }

  render() {
    console.log("RandomNumber render...");
    return (
      <div>
        <p>随机数：{this.state.number}</p>
        <button onClick={this.handleClick}>生成随机数</button>
      </div>
    );
  }

  handleClick = () => {
    this.setState(() => {
      return {
        number: Math.floor(Math.random() * 2)
      }
    });
  }

  // 两次生成的随机数相同时不需要重新渲染组件
  shouldComponentUpdate(nextProps, nextState) {
    // nextState: 最新状态；this.state：当前状态
    console.log("当前state", this.state, "最新state", nextState);
    return this.state.number !== nextState.number;
  }
}
root.render(<RandomNumber />)

class PropRandomNumber extends React.Component {

  state = {
    number: 0
  }

  render() {
    return (
      <div>
        <Number number={this.state.number} />
        <button onClick={this.handleClick}>生成随机数</button>
      </div>
    );
  }

  handleClick = () => {
    this.setState(() => {
      return {
        number: Math.floor(Math.random() * 3)
      }
    });
  }
}

class Number extends React.Component {

  render() {
    console.log("Number render...");
    return (
      <p>随机数：{this.props.number}</p>
    );
  }

  shouldComponentUpdate(nextProps) {
    console.log("当前props", this.props, "最新props", nextProps);
    return this.props.number !== nextProps.number;
  }
}
root.render(<PropRandomNumber />);

// 纯组件：shallow compare浅层对比。
// 值类型比较值是否相等。
// 引用类型比较对象的地址是否相同。（建议创建新对象而不是直接修改原对象。如果是数组则不要使用push/unshift方法而应该用concat或slice等返回新数组的方法）
class PureRandomNumber extends React.PureComponent {

  state = {
    number: 0
  }

  render() {
    console.log("PureRandomNumber render...");
    return (
      <div>
        <p>随机数：{this.state.number}</p>
        <button onClick={this.handleClick}>生成随机数</button>
      </div>
    );
  }

  handleClick = () => {
    this.setState(() => {
      return {
        number: Math.floor(Math.random() * 2)
      }
    });
  }
}
root.render(<PureRandomNumber />);

/**
 * React更新视图的思想是：只要state变化就重新渲染视图
 * 问题：当组件中只有一个DOM元素需要更新时，也需要把整个组件的内容重新渲染到页面中？
 * 理想状态：增量更新，只更新变化的部分。
 * React使用虚拟DOM配合Diff算法实现增量更新。
 * 
 * 虚拟DOM：本质是一个js对象，React元素。描述页面上展示的内容。
 * 
 * 执行过程：
 * 1. 第一次渲染时，React根据初始state，创建一个虚拟DOM对象树。
 * 2. 根据虚拟DOM对象树生成真正的浏览器DOM树，渲染在浏览器中。
 * 3. 当调用setState()方法导致数据变化时，重新根据新的state，创建新的虚拟DOM对象树。
 * 4. 使用Diff算法与上一次得到的虚拟DOM对象树进行对比，找到需要更新的内容。
 * 5. 最终，React只将需要更新的内容更新（patch）到浏览器DOM树中，重新渲染到浏览器中。
 */

/**
 * react router 路由
 */
const Home = () => <p>Home</p>
const About = () => <p>About</p>

const RouterApp = () => {

  return (
    <div>
      <p>react路由基础</p>
      {/* 指定路由入口 */}
      <NavLink to="/home">Home</NavLink>
      &nbsp;
      <NavLink to="/about">About</NavLink>
      {/* 指定路由出口 */}
      {/* 基础写法 */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Navigate to="/about" />} />
      </Routes>
    </div>
  )
}

root.render(
  <Router>
    <RouterApp />
  </Router>
);

const UseRoutesApp = () => {

  // 使用路由表
  const elements = useRoutes([
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/',
      element: <Navigate to="/home" />
    },
  ]);

  return (
    <div>
      <p>react路由表</p>
      {/* 指定路由入口 */}
      <NavLink to="/home">Home</NavLink>
      &nbsp;
      <NavLink to="/about">About</NavLink>
      {/* 指定路由出口 */}
      {elements}
    </div>
  );
}

root.render(
  <Router>
    <UseRoutesApp />
  </Router>
);


// import routes from './routes';
const OutUseRoutesApp = () => {

  // 使用外部路由表
  const elements = useRoutes(routes);

  return (
    <div>
      <p>react外部路由表</p>
      {/* 指定路由入口 */}
      <NavLink to="/home">Home</NavLink>
      &nbsp;
      <NavLink to="/about">About</NavLink>
      {/* 指定路由出口 */}
      {elements}
    </div>
  );
}

root.render(
  <Router>
    <OutUseRoutesApp />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
