import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const SharedTemplateForm = ({ templates, handleSubmit, id, setToastData, forEditing }) => {
  const [templateName, setTemplateName] = useState('');
  const [templateAuthor, setTemplateAuthor] = useState('');
  const [templateText, setTemplateText] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return
    const template = templates.find((template_) => template_.id === parseInt(id))
    if (!template) {
      setToastData({
        show: true,
        message: 'No such template',
        background: 'danger',
        });
      navigate('/');
      return
    }
      setTemplateName(template.template_name);
      setTemplateText(template.template_text);
      setTemplateAuthor(template.template_author);
    }, [id, setToastData, navigate, templates]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="8" controlId="formTemplateName">
          <Form.Label>Template Name</Form.Label>
          <Form.Control
            autoComplete="off"
            required
            maxLength={50}
            name="template-name"
            data-cy="template-name"
            type="text"
            placeholder="Enter a name for your template"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="formTemplateAuthor">
          <Form.Label>Author name</Form.Label>
          <Form.Control
            autoComplete="off"
            maxLength={50}
            name="template-author"
            data-cy="template-author"
            placeholder="Enter the author's name"
            value={templateAuthor}
            onChange={(e) => setTemplateAuthor(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formTemplateText">
        <Form.Label>Template Text</Form.Label>
        <Form.Control
          name="template-text"
          data-cy="template-text"
          as="textarea"
          rows={10}
          placeholder="Enter the template text"
          value={templateText}
          onChange={(e) => setTemplateText(e.target.value)}
        />
      </Form.Group>
      <Button data-cy="submit" variant="primary" type="submit" name="submit" value={forEditing ? "put" : "post"}>
        Submit
      </Button>{' '}
      {forEditing ? (
        <Button data-cy="delete" variant="danger" type="submit" name="delete" value="delete">
          Delete
        </Button>
      ) : null}
    </Form>
  );
};
SharedTemplateForm.propTypes = {
  templates: PropTypes.array,
  handleSubmit: PropTypes.func,
  setToastData: PropTypes.func,
  id: PropTypes.string,
  forEditing: PropTypes.bool,
};

export default SharedTemplateForm;
