from flask import Flask, request, render_template, jsonify
from public.server.main import Server
from flask_socketio import SocketIO, emit
app = Flask(__name__)

socketio = SocketIO(app)
app.config['SECRET_KEY'] = 'secret!'
app.debug = True
@app.route("/", methods=['GET', 'POST'])


def start():
    if(request.method == "POST"):
        PATH2DB = "base.db"
        conf = {}
        main_server = Server(PATH2DB)

        conf["module"] = request.args.get("module")
        conf["action"] = request.args.get("action")
        conf["data"] = request.json

        
        # print("\n\n data['password']=> ", conf)
        result = main_server.getAnswerFromComponent(conf)

        return jsonify(result)

    return render_template("index.html")

# @socketio.on('connect')
# def test_connect1111():
#     print("test_connect")
#     socketio.emit('any event', {'data': 'Connected'})

@socketio.on('connect')
def test_connect():
    print('Client connected')
    emit('my response', {'data': 'Connected'})
 


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)


@socketio.on('send-msg')
def handle_message(msg):
    print("errroe")
    emit('show-msg', msg, broadcast=True)


@socketio.on('send_message')
def handle_source(json_data):
    print("send_message")
    print("connct11111123123123123")
    socketio.emit('send_message', {'send_message': 'Server Says: '})

@socketio.on("send message")
def message(data):
    room = data['channel']
    emit('broadcast message', data['message'], room=room)


def handle_message(message):
    print('received message: ' + message)
    
@socketio.on('any event')
def new_user(message):
	print ('Inside new user' + message)
	# user = message['username']
	# sid = request.sid
	# # print user, sid
	# if not user in active_users:
	# 	active_users.append(user)
	# 	messages[user] = {}
	# user_sid[user] = sid
	# emit('active users updated', active_users, broadcast=True)
@socketio.on('my event')
def handle_my_custom_event(json):
    print("my event")
    emit('my response', json)
if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', debug=True)
    # app.run(port=4567)
