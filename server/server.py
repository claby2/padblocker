import flask, requests, serial
from flask import request, jsonify, send_from_directory   

app = flask.Flask(__name__)
app.config["DEBUG"] = True

ser = serial.Serial('/dev/cu.Repleo-CH341-00003314', 9600)

@app.route('/')
def hello_world():
    return 'lorem5000'

# counter = 32

# while True:
#     counter = counter + 1
#     ser.write(bytes(chr(counter), 'utf-8')) # Convert the decimal number to ASCII then send it to the Arduino
#     print(ser.readline()) # Read the newest output from the Arduino
#     # sleep(.1) # Delay for one tenth of a second
#     if counter == 255:
#         counter = 32

@app.route('/cm/input', methods=['POST'])
def getCm():
    # content = request.json
    # cmTop = content['cm-top']
    # cmBottom = content['cm-bottom']
    content = request.args['top']
    resp = flask.Response(content)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    ser.write(bytes(content, 'utf-8'))
    print(ser.read())
    return resp
    # return resp
    # ser.write(cmBottom)

app.run()

# print(ser.name)
# ser.write(b'hello')

# @app.route('/get/coords', methods=['GET'])
# def getCoords():
#     coords = request.args['coords']
#     ser.write(b'SUCCESS')``


# >>> ser = serial.Serial('/dev/ttyUSB0')  # open serial port
# >>> print(ser.name)         # check which port was really used
# >>> ser.write(b'hello')     # write a string
# >>> ser.close() 