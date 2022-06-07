import React from "react";

class Comment extends React.Component {

  // 初始化状态
  state = {
    comments: [
      { id: 1, name: "Jack", content: "沙发！" },
      { id: 2, name: "Tom", content: "一楼" },
      { id: 3, name: "Alice", content: "666" }
    ],

    // 昵称
    userName: '',
    // 评论内容
    content: ''
  }

  render() {
    const { userName, content } = this.state;
    return (
      <div className="app">
        <div>
          <input
            className="user"
            type="text"
            placeholder="请输入昵称"
            value={userName}
            name="userName"
            onChange={this.handleForm}
          /><br />
          <textarea
            className="content"
            cols="30"
            rows="10"
            placeholder="大侠请留步，留下评论再走也不迟~"
            value={content}
            name="content"
            onChange={this.handleForm}
          /><br />
          <button onClick={this.addComment}>发表评论</button>
        </div>

        {this.renderList()}
      </div>
    );
  }

  renderList() {
    // 解构赋值
    const { comments } = this.state;

    // 条件渲染
    if (comments.length === 0) {
      return <div className="no-comment">暂无评论，快去占沙发吧~</div>;
    }

    return (
      <ul>
        {
          comments.map(item => (
            <li key={item.id}>
              <h3>评论人：{item.name}</h3>
              <p>评论内容：{item.content}</p>
            </li>
          ))
        }
      </ul>
    )
  }

  handleForm = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addComment = () => {
    const { comments, userName, content } = this.state;

    // 非空检验
    if (userName.trim() === '' || content.trim() === '') {
      alert("请输入昵称或评论内容！");
      return;
    }

    const newComments = [
      {
        id: Math.random(),
        name: userName,
        content: content
      },
      ...comments
    ];
    this.setState({
      comments: newComments,
      // 评论添加完成后清空昵称和评论内容
      userName: '',
      content: ''
    })
  }
}

export default Comment
