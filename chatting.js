window.onload = init;
function init() {
//删除事件

    //获取元素内容
    const btn = document.querySelector(".btn");
    const username = document.querySelector("#username");
    const face = document.getElementsByName("face");
    const textarea = document.querySelector("textarea");
    const content = document.querySelector(".content");

    const count = document.querySelector(".count");
    content.onclick = function (e) {
        if (e.target.className === "dele") {
            const parent = e.target.parentNode.parentNode;
            const name = parent.querySelector(".msgbox a:first-child").innerHTML; //获取要删除元素的用户名
            if (confirm(`是否要删除${name}的内容？`)) {
                parent.parentElement.removeChild(parent);
            }
        }

    };

    //监听文本框输入字数
    counter(count, textarea);
    function counter(countText, formText) {
        let key;
        key = false;
        formText.addEventListener("keyup", function () {
            if (key === false) {
                countText.innerHTML = 140 - formText.value.length;
            }
        });
        formText.addEventListener("compositionstart", function () {
            key = true;
        });
        formText.addEventListener("compositionend", function () {
            key = false;
            countText.innerHTML = 140 - formText.value.length;
        });
    }

    //添加留言元素
    btn.onclick = function () {
        let div;
        let value;
        const usernameTest = /^[A-z0-9_\u4e00-\u9fa5]{2,16}$/;  //正则匹配正确的用户名（包括字母、汉字、数字和下划线）
        const textareaTest = /.{4}/;      //正则匹配至少4个字符
        if (username.value === "" || textarea.value === "") {
            alert("请填写完整信息。");
        } else if (!usernameTest.test(username.value)) {
            alert("请填写正确的用户名包括字母、汉字、数字和下划线");
        } else if (!textareaTest.test(textarea.value)) {
            alert("请输入至少4个字");
        } else {
            div = document.createElement("div"); //创建节点接入DOM
            content.appendChild(div);

            div.classList.add("msgbox");

            let day = formatDate(new Date()); //获取当前时间
            for (let i = 0; i < face.length; i++) { //遍历获取radio的选项
                if (face[i].checked) {
                    value = face[i].value;
                }

            }
            div.innerHTML = `<img src="images/${value}.jpeg" alt="">
            <p><a href="javascript:;">${username.value}</a>: ${textarea.value}</p>
        <p>${day}<a class="dele" href="javascript:;">删除</a></p>`;
            username.value = "";
            textarea.value = "";
            face[0].checked = true; //让radio回到初始状态
        }
        return false;
    };

    //获取调用函数时的当前时间
    function formatDate(date) {
        let d = date;
        d = [
            '0' + (d.getMonth() + 1),
            '0' + d.getDate(),
            '' + d.getFullYear(),
            '0' + d.getHours(),
            '0' + d.getMinutes()
        ].map(component => component.slice(-2)); // 得到每个组件的后两位

        // 将时间信息和日期组合在一起
        return d.slice(0, 2).join('月') + '日 ' + d.slice(3).join(':');
    }
}