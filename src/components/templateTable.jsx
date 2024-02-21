import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TemplateTable({ templates }) {
  const navigate = useNavigate();

  const loadTemplate = id => {
    navigate(`/templates/${id}`);
  };

  const editTemplate = id => {
    navigate(`/templates/${id}/edit`);
  }

  return (
    <Table data-cy="template-table" striped bordered hover>
      <thead>
        <tr>
          <th>Template ID</th>
          <th>Template Name</th>
          <th>Author</th>
          <th>{''}</th>
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
              <td><Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); editTemplate(id) }}>Edit</Button></td>
            </tr>
          ),
        )}
      </tbody>
    </Table>
  );
}
TemplateTable.propTypes = {
  templates: PropTypes.array,
};

export default TemplateTable;
