from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4', 'wav'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Maximum file size 16MB


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200
    else:
        return jsonify({'error': 'File type is not allowed'}), 400
    

from flask import send_file

@app.route('/submit-query', methods=['POST'])
def submit_query():
    data = request.json
    query = data.get('query')
    if query:
        # Here you can return the uploaded video file
        filename = 'Mahi_Ve.mp4'  # Adjust filename as needed
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        return send_file(filepath, mimetype='video/mp4')
    else:
        return jsonify({'error': 'No query received'}), 400




if __name__ == '__main__':
    app.run(debug=True)
