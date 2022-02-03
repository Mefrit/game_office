from flask import Flask, request, render_template, jsonify
from public.server.main import Server
from flask_socketio import SocketIO, emit, join_room,send, leave_room, \
    close_room, rooms, disconnect
from threading import Lock
app = Flask(__name__)
async_mode = None
socket_io = SocketIO(app)

# socket_io = SocketIO(app, async_mode=async_mode)
app.config['SECRET_KEY'] = 'secret!'
app.debug = True

thread = None
thread_lock = Lock()

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

@socket_io.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	send(msg, broadcast=True)

# @socket_io.on('my event')
# def handle_my_custom_event(json):
#     print('received json: ' + str(json))


# @app.route('/')
# def index():
#     return render_template('client.html')
# @socket_io.on("disconnect",namespace="/")
# def disconnect():
#     print("disconnect(((((((( ", request)


# @socket_io.on("connect",namespace="/")
# def connect():
#     print("connection!!!!!!!!!!!!!222: ", request.sid)

# @socket_io.on("test", namespace='/')
# def test():
#     print("test111111")
#     emit('test_client', [], broadcast=True)


if __name__ == "__main__":
    # socketio.run(app, host='0.0.0.0', debug=True)
    socket_io.run(app)
    # app.run(port=4567)


# from flask import Flask, request, render_template, jsonify
# from public.server.main import Server
# app = Flask(__name__)


# @app.route("/", methods=['GET', 'POST'])
# def start():
#     if(request.method == "POST"):
#         PATH2DB = "base.db"
#         conf = {}
#         main_server = Server(PATH2DB)

#         conf["module"] = request.args.get("module")
#         conf["action"] = request.args.get("action")
#         conf["data"] = request.json


#         print("\n\n data['password']=> ", conf)
#         result = main_server.getAnswerFromComponent(conf)

#         return jsonify(result)

#     return render_template("index.html")


# if __name__ == "__main__":
#     print("server start 4567")
#     app.run(port=4567)