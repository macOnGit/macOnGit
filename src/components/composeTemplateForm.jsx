import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import SharedTemplateForm from './templateForm';

function TemplateForm({ templates, setTemplates, setToastData, forEditing }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const getNextHighestID = array => {
    if (!array.length) {
      return 1;
    }
    const ids = array.map(element => element.id);
    const highestId = Math.max(...ids);
    return highestId + 1;
  };

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
    <SharedTemplateForm
      templates={templates}
      handleSubmit={handleSubmit}
      setToastData={setToastData}
      id={id}
      forEditing={forEditing}
    />
  );
}
TemplateForm.propTypes = {
  templates: PropTypes.array,
  setTemplates: PropTypes.func,
  setToastData: PropTypes.func,
  forEditing: PropTypes.bool,
};

export default TemplateForm;
