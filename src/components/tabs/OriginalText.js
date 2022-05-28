import { Container, Form } from 'react-bootstrap';

function OriginalText() {

    return (
      <div>
        <h4>Edit Original Text</h4>
        <p>In this section, paste or write the original text you are working with (in whatever annotation you prefer). You'll then be able to highlight sections and indicate their quality, missing parts, and so on.</p>
        <Form.Group className="mb-3">
          <Form.Label>Original Text</Form.Label>
          <Form.Control as="textarea" rows={10} placeholder="Paste or type your original text here." />
        </Form.Group>
      </div>
    );

}

export default OriginalText;
