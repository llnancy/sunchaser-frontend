import React from "react";

class Comment extends React.Component {

  // 初始化状态
  state = {
    comments: [
      { id: 1, name: "Jack", content: "沙发！" },
      { id: 2, name: "Tom", content: "一楼" },
      { id: 3, name: "Alice", content: "666" }
    ]
  }

  render() {
    return (
      <div className="app">
        <div>
          <input
            className="user"
            type="text"
            placeholder="请输入昵称"
          /><br />
          <textarea
            className="content"
            cols="30"
            rows="10"
            placeholder="大侠请留步，留下评论再走也不迟~"
          /><br />
          <button>发表评论</button>
        </div>

        {this.renderList()}
      </div>
    );
  }

  renderList() {
    const { comments } = this.state;
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
}

export default Comment
