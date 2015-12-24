(function() {
  const topic = 'build';
  var broker = {
    hostname: "m20.cloudmqtt.com",
    port: 30576
  };

  var JENKINS_STATES = {
    WORKING: "SUCCESS",
    BROKEN: "FAILURE"
  }

  var BUILD_STATES = {
    UNKOWN: 'UNKOWN',
    WORKING: 'working',
    BROKEN: 'broken'
  };

  const clientId = '' + Math.random();
  var client = new Paho.MQTT.Client(
    broker.hostname,
    Number(broker.port),
    'clientId');
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  var vm = new Vue({
    el: '#app',
    data: {
      connected: false,
      messages: [],
      status: BUILD_STATES.UNKOWN,
      newStatus: null
    },
    methods: {
      changeState: function(newState) {
        sendBuildState(newState);
      },
      connect: doConnect,
      disconnect: function() {
        client.disconnect();
        doConnect();
      }
    }
  });

  Vue.transition('expand', {
    afterEnter: function (el) {
      vm.status = vm.newStatus;
      vm.newStatus = null;
    }
  });

  function doConnect() {
    if(client.isConnected())
      return;
    client.connect({
      userName: creds.user,
      password: creds.password,
      useSSL: true,
      onSuccess:onConnect
    });
  }
  doConnect();

  function onConnect() {
    vm.connected = true;
    client.subscribe(topic);
  }
  function onConnectionLost(responseObject) {
    vm.connected = false;
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    var obj = JSON.parse(message.payloadString);
    var working = obj.working.toUpperCase() === JENKINS_STATES.WORKING;

    setBuildState(working);
    vm.messages.push(message.payloadString)
  }

  function setBuildState(working) {
    if(working) {
      vm.newStatus = BUILD_STATES.WORKING;
    } else {
      vm.newStatus = BUILD_STATES.BROKEN;
    }
  }

  function sendBuildState(working) {
    var txtMessage = working ? JENKINS_STATES.WORKING : JENKINS_STATES.BROKEN;

    var message = new Paho.MQTT.Message('{ "working": "' + txtMessage+ '" }');
    message.destinationName = topic;
    message.retained = true;
    client.send(message);
  }
})();


