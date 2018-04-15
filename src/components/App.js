import React, {Component} from 'react'
import { getEmpData, changeEmpData} from '../AC'
import {connect} from 'react-redux'
import 'antd/dist/antd.css'
import '../css/style.css'
import '../fonts/css/fontello.css'
import {Layout, LocaleProvider } from 'antd'
import uk_UA from 'antd/lib/locale-provider/uk_UA';
import { withRouter, BrowserRouter as Router } from "react-router-dom"
import Pages from '../pages'
import Sidebar from './Sidebar'
import Loader from "./Loader";
import moment from 'moment'
moment.locale('uk');
const {Sider, Content} = Layout
class App extends  Component{
    static propTypes = {
    };
    render(){
        const pathname = this.props.location.pathname.replace(/[.\/\\]/g,"");
        return(
            <LocaleProvider locale={uk_UA}>
            <Layout style={{minHeight: '100vh'}}>
                <Sider >
                <Sidebar pathname={pathname}/>
                </Sider>
                <Layout>
                    <Content>
                      <Pages pathname={pathname} {...this.props}/>
                    </Content>
                </Layout>
            </Layout>
                </LocaleProvider>
                )
    }
}
export  default withRouter( connect(
    (state)=> {
        return {
            employees: state.employees
        }
    }, {
    getEmpData,
    changeEmpData
    })(App) )