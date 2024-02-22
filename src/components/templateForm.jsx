import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getNextHighestID } from '../utils';

const TemplateForm = ({
  templates,
  setTemplates,
  setToastData,
  forEditing,
}) => {
  const [templateName, setTemplateName] = useState('');
  const [templateAuthor, setTemplateAuthor] = useState('');
  const [templateText, setTemplateText] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const template = templates.find(template_ => template_.id === parseInt(id));
    if (!template) {
      setToastData({
        show: true,
        message: 'No such template',
        background: 'danger',
      });
      navigate('/');
      return;
    }
    setTemplateName(template.template_name);
    setTemplateText(template.template_text);
    setTemplateAuthor(template.template_author);
  }, [id, setToastData, navigate, templates]);

  const handleSubmit = event => {
    event.preventDefault();
    const intID = parseInt(id);
    if (id && isNaN(intID)) {
      setToastData({
        show: true,
        message: 'No such template',
        background: 'danger',
      });
      return navigate('/templates');
    }

    let actionMessage = 'Invalid action';

    const deleteTemplate = event.nativeEvent.submitter?.value === 'delete';
    const newTemplate = event.nativeEvent.submitter?.value === 'post';
    const editTemplate = event.nativeEvent.submitter?.value === 'put';

    const formEls = event.target.elements;
    const template_name = formEls['template-name'].value;
    const template_text = formEls['template-text'].value;
    const template_author = formEls['template-author'].value || 'Anonymous';

    if (deleteTemplate) {
      setTemplates(templates.filter(template => template.id !== intID));
      actionMessage = 'Template deleted!';
    } else if (editTemplate) {
      setTemplates(
        templates.map(template => {
          if (template.id === intID) {
            return {
              ...template,
              template_name,
              template_text,
              template_author,
            };
          } else {
            return template;
          }
        }),
      );
      actionMessage = 'Template Edited!';
    } else if (newTemplate) {
      const nextId = getNextHighestID(templates);
      setTemplates([
        ...templates,
        {
          id: nextId,
          template_name,
          template_text,
          template_author,
        },
      ]);
      actionMessage = 'Template Created!';
    }
    setToastData({
      show: true,
      message: actionMessage,
      background:
        deleteTemplate || editTemplate || newTemplate ? 'success' : 'danger',
    });
    return navigate('/templates');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="8" controlId="formTemplateName">
          <Form.Label>Template Name</Form.Label>
          <Form.Control
            autoFocus
            autoComplete="off"
            required
            maxLength={50}
            name="template-name"
            data-cy="template-name"
            type="text"
            placeholder="Enter a name for your template"
            value={templateName}
            onChange={e => setTemplateName(e.target.value)}
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
            onChange={e => setTemplateAuthor(e.target.value)}
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
          onChange={e => setTemplateText(e.target.value)}
        />
      </Form.Group>
      <Button
        data-cy="submit"
        variant="primary"
        type="submit"
        name="submit"
        value={forEditing ? 'put' : 'post'}
      >
        Submit
      </Button>{' '}
      {forEditing ? (
        <Button
          data-cy="delete"
          variant="danger"
          type="submit"
          name="delete"
          value="delete"
        >
          Delete
        </Button>
      ) : null}
    </Form>
  );
};
TemplateForm.propTypes = {
  templates: PropTypes.array,
  setTemplates: PropTypes.func,
  setToastData: PropTypes.func,
  id: PropTypes.string,
  forEditing: PropTypes.bool,
};

export default TemplateForm;
