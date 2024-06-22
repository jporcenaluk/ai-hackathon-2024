from flask import Flask, request, jsonify
# Make sure this import is correct based on your project structure
from assistant import get_rag_assistant
from phi.utils.log import logger
port = 5200
app = Flask(__name__)

# Initialize the assistant (modify parameters as necessary)
llm_model = "llama3"
embeddings_model = "nomic-embed-text"
rag_assistant = get_rag_assistant(
    llm_model=llm_model, embeddings_model=embeddings_model)


@app.route('/', methods=['GET'])
def getapp():
    return jsonify({"message": "FLASK APP RUNNING on port: 5200"})


@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()

    if not data or 'prompt' not in data:
        return jsonify({"error": "No prompt provided"}), 400

    prompt = data['prompt']

    try:
        response = ""
        for delta in rag_assistant.run(prompt):
            response += delta  # type: ignore

        return jsonify({"response": response})
    except Exception as e:
        logger.error(f"Error during processing: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
