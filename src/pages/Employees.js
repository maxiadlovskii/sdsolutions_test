import React, {Component} from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';

const columns = [{
    title: 'Name',
    dataIndex: 'first_name',
    sorter: (a, b) => sortColumn(a, b, ['first_name', 'last_name']),
    render: (text, record, index) => <span className={'nameAvatar'}><img src={record.avatar}/><span>{`${record.first_name} ${record.last_name}`}</span></span>,
    width: '30%',
}, {
    title: 'Company / Adress / Email / Phone',
    dataIndex: 'company',
    sorter: (a, b) => sortColumn(a, b, ['company', 'adress', 'email', 'phone']),
    width: '80%',
    render: (text, record, index) => <span className={'companyField'}>
        <b>{'Company: '}</b>{record.company}
        <b>{' adress: '}</b>{record.adress}
        <b>{' email: '}</b>{record.email}
        <b>{' phone: '}</b>{record.phone}

        </span>,
}];

function sortColumn(a, b, names) {

    var resultA = names.reduce(function(conc, current) {
        return conc + a[current];
    }, '');

    var resultB = names.reduce(function(conc, current) {
        return conc + b[current];
    }, '');


    if (resultA < resultB) {
        return -1;
    }
    if (resultA > resultB) {
        return 1;
    }
    // names must be equal
    return 0;
};


class Employees extends Component {
    handleTableChange = (pagination, filters, sorter) => {
        console.log( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! sorter", sorter )
        const pager = { ...this.props.employees.pagination };
        pager.current = pagination.current;
        this.props.changeEmpData({
            _limit: pagination.pageSize,
            _page: pagination.current,
            _sort: sorter.field,
            _order: sorter.order ? sorter.order.substring(0, sorter.order.length - 3) : null,
            ...filters,
        }, pager)

    }
    componentDidMount() {
        this.props.getEmpData();
    }
    render() {
        return (
            <Table columns={columns}
                   rowKey={record => record.id}
                   dataSource={this.props.employees.entities}
                   pagination={this.props.employees.pagination}
                   loading={this.props.employees.loading}
                   onChange={this.handleTableChange}
            />
        );
    }
}


export default Employees;
