import Vue from 'vue'
import {
  Button, Input, FormItem, Form, Select, Option, Row, Col, Message, Container, Header, Aside, Main, Footer, Dropdown, DropdownMenu, DropdownItem, Checkbox,
  CheckboxButton, CheckboxGroup, Tabs, TabPane, Menu, Submenu, MenuItem, MenuItemGroup, Collapse, CollapseItem, Card, Tag, Loading, Pagination 
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
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Loading);
Vue.use(Pagination);