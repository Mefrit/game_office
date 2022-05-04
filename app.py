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
        result = main_server.getAnswerFromComponent(conf)

        return jsonify(result)

    return render_template("index.html")

@socket_io.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	send(msg, broadcast=True)


if __name__ == "__main__":
    socket_io.run(app)