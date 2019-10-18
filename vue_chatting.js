//信息填写表单组件
Vue.component('face-radio', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: ['radio'],
    template: `<span>
                <input type="radio" name="face" :id="radio.value" :value="radio.value" :checked="radio.checked" @change="$emit('change', radio.src)" hidden />
               <label :for="radio.value"><img :src="radio.src"></label>
               </span>
                `
});
//内容展示组件
Vue.component('chat-page', {
    props: ['user'],
    template: `
                <li class="msgbox">
                    <img :src="user.src" alt="">
                    <p><a href="javascript:">{{user.username}}</a>: {{user.text}}</p>
                    <p class="date">{{user.date}}<a class="dele" href="javascript:" @click="$emit('remove')">删除</a></p>
                </li>`
});
let main = new Vue({
    el: '#main',
    data: {
        //用户信息 头像，姓名，填写内容
        radios: [
            {value: 1, src: 'images/1.jpeg', checked: true},
            {value: 2, src: 'images/2.jpeg', checked: false},
            {value: 3, src: 'images/3.jpeg', checked: false},
            {value: 4, src: 'images/4.jpeg', checked: false},
            {value: 5, src: 'images/5.jpeg', checked: false}
        ],
        username: '',
        src: 'images/1.jpeg',
        text: '',
        //用户信息数据数组
        users: [
            {src: 'images/4.jpeg', username: 'Jack', text: '新增广播删除功能', date: '08月03日 17:40'}
        ]
    },
    methods: {
        formatDate: function (date) {
            // Y = date.getFullYear() + '年';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
            D = date.getDate() + '日';
            h = date.getHours() + ':';
            m = date.getMinutes();
            return (M + D + h + m);
        },
        submit: function () {
            const usernameTest = /^[A-z0-9_\u4e00-\u9fa5]{2,16}$/;  //正则匹配正确的用户名（包括字母、汉字、数字和下划线）
            const textareaTest = /.{4}/;//正则匹配至少4个字符
            //判断用户是否正确填写信息
            if (this.username=== "" || this.textarea === "") {
                alert("请填写完整信息。");
            } else if (!usernameTest.test(this.username)) {
                alert("请填写正确的用户名包括字母、汉字、数字和下划线");
            } else if (!textareaTest.test(this.textarea)) {
                alert("请输入至少4个字");
            } else {
                //创建当前日期
                let now = new Date();
                now = this.formatDate(now);
                //增加用户信息
                this.users.push({
                    src: this.src,
                    username: this.username,
                    text: this.text,
                    date: now
                });
                this.username = '';
                this.text = '';
            }
        },
        move: function (index) {
            if (confirm(`是否要删除${this.users[index].username}的内容？`)) {
                this.users.splice(index, 1);
            }
        }
    }
});