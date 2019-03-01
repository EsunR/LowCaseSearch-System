import Vue from 'vue'
import {
  Button, Input, FormItem, Form, Select, Option, Row, Col, Message
} from 'element-ui'

Message.install = function (Vue) {
  Vue.prototype.$message = Message
}


Vue.use(Button)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Message)
