const inquirer = require('inquirer');
const exec = require('child_process').execSync;

const promptList = [{
    type: "confirm",
    message: "是否已经登录docker",
    name: "isLogin",
}];

const dockerBuild = () => {
    return exec('docker-compose up --build', {
        stdio: 'inherit'
    });
}
const login = (cb) => {
    inquirer.prompt([{
        type: "input", // 密码为密文输入
        message: "请输入用户名：",
        name: "username"
    }, {
        type: "password", // 密码为密文输入
        message: "请输入密码：",
        name: "password"
    }]).then(r => {
        // 先登录
        try {
            exec(`docker login -u=${r.username} -p=${r.password}`, {
                stdio: 'inherit'
            })
            cb();
        } catch(e) {
            login();
        }
    })
}

const dockerPush = () => {
    return exec('docker push 1109614355/node-cfsw:1.0.2', {
        stdio: 'inherit'
    });
}

const start = () => {
    // 先用本地docker打包
    dockerBuild();
    try {
        dockerPush();
    } catch (e) {
        login(dockerPush);
    }
}

start();
