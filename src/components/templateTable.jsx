import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

function TemplateTable({ loadTemplateEndpoint, templates }) {
  const navigate = useNavigate();

  const loadTemplate = (id) => {
    navigate(
      `/templates/${id}${
        loadTemplateEndpoint ? `/${loadTemplateEndpoint}` : ''
      }`
    );
  };

  return (
    <Table data-cy="template-table" striped bordered hover>
      <thead>
        <tr>
          <th>Template ID</th>
          <th>Template Name</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {templates.map(
          ({
            id,
            template_name: templateName,
            template_author: templateAuthor,
          }) => (
            <tr key={id} onClick={() => loadTemplate(id)}>
              <td>{id}</td>
              <td>{templateName}</td>
              <td>{templateAuthor}</td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
}
TemplateTable.propTypes = {
  loadTemplateEndpoint: PropTypes.string,
  templates: PropTypes.array,
};

export default TemplateTable;
