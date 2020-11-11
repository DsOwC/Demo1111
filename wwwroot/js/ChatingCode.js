var conn = new signalR.HubConnectionBuilder().withUrl("/chatingRooms").build();
conn.start();
var CurrentSender;

function SendMMMMMsg() {
    var GetName = document.getElementById("Sname").value;
    CurrentSender = GetName;
    var GetMsg = document.getElementById("Smsg").value;
    conn.invoke("SendMessage", GetName, GetMsg);
}

conn.on("ReceiveMsg", (name, msg) => {
    var showMsg = document.getElementById("msgListArea");
    var msgListForm = document.createElement("div");
    var NowTime = new Date();
    var CreateNodeName = document.createElement("span");
    var CreateNodeMsg = document.createElement("span");
    if (name == CurrentSender) {
        CreateNodeName.innerText = NowTime.toLocaleString() + "/" + name + " ▼";
        CreateNodeName.setAttribute('class','NodeWriterR');

        CreateNodeMsg.innerText = msg;
        CreateNodeMsg.setAttribute('class','NodeMsgR')

        msgListForm.appendChild(CreateNodeName);
        msgListForm.appendChild(CreateNodeMsg);
    }
    else {
        CreateNodeName.innerText = "▼ " + NowTime.toLocaleString() + "/" + name;
        CreateNodeName.setAttribute('class', 'NodeWriterL');

        CreateNodeMsg.innerText = msg;
        CreateNodeMsg.setAttribute('class', 'NodeMsgL')


        msgListForm.appendChild(CreateNodeName);
        msgListForm.appendChild(CreateNodeMsg);
    }
    //msgListForm.style = "margin-bottom:5px;overflow:hidden";
    msgListForm.setAttribute('class', 'NodeForm');
    showMsg.appendChild(msgListForm);

    //输入框重置
    document.getElementById("Smsg").value = "";
});

$("#Smsg").bind('keydown', function (event) {
    if (event.keyCode == 13) {
        SendMMMMMsg();
    }
});