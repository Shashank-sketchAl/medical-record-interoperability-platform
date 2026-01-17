import spacy
import logging

nlp = None

def load_model():
    global nlp
    if nlp is None:
        try:
            # Try loading scispacy model
            nlp = spacy.load("en_core_sci_sm")
            logging.info("Loaded en_core_sci_sm")
        except OSError:
            try:
                # Fallback to standard model
                nlp = spacy.load("en_core_web_sm")
                logging.warning("en_core_sci_sm not found, using en_core_web_sm")
            except OSError:
                logging.error("No spaCy model found. Please install en_core_sci_sm or en_core_web_sm.")
                nlp = None

def extract_entities(text):
    load_model()
    if not nlp:
        return {"entities": [], "error": "Model not loaded"}

    doc = nlp(text)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]
    return {"entities": entities}
