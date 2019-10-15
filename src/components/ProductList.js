import React from 'react';
import { Table, Popconfirm, Button, Divider } from 'antd';
import { connect } from 'dva';
import { fetch, post } from '../request/http';
import api from '../request/api';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false
    }
  }
  //在渲染前调用,在客户端也在服务端。
  componentWillMount() {
    console.log('Component WILL MOUNT!')
    this.ajaxToData();

  };

  //在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，
  //可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
  // componentDidMount() {
  //      console.log('Component DID MOUNT!')
  // }
  // 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用
  // componentWillReceiveProps(newProps) {
  //       console.log('Component WILL RECEIVE PROPS!')
  // }
  //返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
  //可以在你确认不需要更新组件时使用。
  // shouldComponentUpdate(newProps, newState) {
  //       return true;
  // }
  //在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
  // componentWillUpdate(nextProps, nextState) {
  //       console.log('Component WILL UPDATE!');
  // }
  //组件完成更新后立即调用。在初始化时不会被调用。
  // componentDidUpdate(prevProps, prevState) {
  //       console.log('Component DID UPDATE!')
  // }
  //在组件从 DOM 中移除之前立刻被调用。
  // componentWillUnmount() {
  //        console.log('Component WILL UNMOUNT!')
  // }

  ajaxToData() {
    const _this = this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    fetch(api.product.getAll).then(data => {
      console.log(data)
      _this.setState({
        users: data.data,
        isLoaded: true
      })
    })





  }



  render() {

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'Telephone',
        dataIndex: 'telephone',
      },
    ];

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <div>
        <Table columns={columns} dataSource={this.state.users} />

      </div>
    )
  }

}



//export default Index;

export default connect(state => {
  console.log(state)
})(Index);

